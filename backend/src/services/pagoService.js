import { randomUUID } from 'node:crypto';
import mongoose from 'mongoose';

import Cliente from '../models/Cliente.js';
import Pedido from '../models/Pedido.js';
import Pago from '../models/Pago.js';
import Producto from '../models/Producto.js';

class ErrorPago extends Error {
    constructor(mensaje, codigo = 400) {
        super(mensaje);
        this.codigo = codigo;
    }
}

const validarCliente = datos => {
    if (!datos || typeof datos !== 'object') {
        throw new ErrorPago('Información del cliente inválida.');
    }

    const campos = [
        'tipoDocumento',
        'numeroDocumento',
        'nombres',
        'apellidos',
        'telefono',
        'correo'
    ];

    for (const campo of campos) {
        if (
            typeof datos[campo] !== 'string' ||
            !datos[campo].trim()
        ) {
            throw new ErrorPago(
                `El campo ${campo} es obligatorio.`
            );
        }
    }

    if (!['CC', 'CE', 'TI', 'PASAPORTE', 'OTRO']
        .includes(datos.tipoDocumento)) {
        throw new ErrorPago('Tipo de documento inválido.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(datos.correo.trim())) {
        throw new ErrorPago('Correo electrónico inválido.');
    }
};

const prepararProductos = async items => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new ErrorPago('El carrito está vacío.');
    }

    // En esta fase solo procesamos productos físicos.
    if (items.some(item => item.tipo !== 'producto')) {
        throw new ErrorPago(
            'PagoFacil aún no procesa cursos, entradas o reservas.'
        );
    }

    const cantidades = new Map();

    for (const item of items) {
        if (
            !mongoose.isObjectIdOrHexString(item.referenciaId) ||
            !Number.isSafeInteger(item.cantidad) ||
            item.cantidad <= 0
        ) {
            throw new ErrorPago('Artículo o cantidad inválida.');
        }

        const id = String(item.referenciaId);
        cantidades.set(
            id,
            (cantidades.get(id) || 0) + item.cantidad
        );
    }

    const productosPedido = [];

    for (const [id, cantidad] of cantidades) {
        if (!Number.isSafeInteger(cantidad)) {
            throw new ErrorPago('Cantidad inválida.');
        }

        const producto = await Producto.findOne({
            _id: id,
            activo: true
        }).lean();

        if (!producto) {
            throw new ErrorPago(
                'Uno de los productos ya no está disponible.',
                409
            );
        }

        if (producto.stock < cantidad) {
            throw new ErrorPago(
                `Inventario insuficiente: ${producto.nombre}.`,
                409
            );
        }

        productosPedido.push({
            tipo: 'producto',
            referenciaId: id,
            nombre: producto.nombre,
            cantidad,
            precioUnitario: producto.precio,
            subtotal: producto.precio * cantidad,
            detalles: {
                sku: producto.sku,
                imagen: producto.imagenes?.[0] || ''
            }
        });
    }

    return productosPedido;
};

const descontarInventario = async items => {
    const descontados = [];

    try {
        for (const item of items) {
            const producto = await Producto.findOneAndUpdate(
                {
                    _id: item.referenciaId,
                    activo: true,
                    stock: { $gte: item.cantidad }
                },
                {
                    $inc: { stock: -item.cantidad }
                },
                { new: true }
            );

            if (!producto) {
                throw new ErrorPago(
                    `Inventario insuficiente: ${item.nombre}.`,
                    409
                );
            }

            descontados.push(item);
        }

        return descontados;

    } catch (error) {
        // Compensación de descuentos realizados.
        for (const item of [...descontados].reverse()) {
            await Producto.updateOne(
                { _id: item.referenciaId },
                { $inc: { stock: item.cantidad } }
            );
        }

        throw error;
    }
};

export const procesarPago = async ({
    cliente: datosCliente,
    items,
    metodoPago,
    claveSolicitud
}) => {
    validarCliente(datosCliente);

    if (!['debito', 'credito'].includes(metodoPago)) {
        throw new ErrorPago('Método de pago inválido.');
    }

    if (
        typeof claveSolicitud !== 'string' ||
        !/^[0-9a-f-]{36}$/i.test(claveSolicitud)
    ) {
        throw new ErrorPago('Identificador de solicitud inválido.');
    }

    // Una solicitud procesada no debe ejecutarse dos veces.
    const existente = await Pedido.findOne({
        claveSolicitud
    }).lean();

    if (existente) {
        throw new ErrorPago(
            'Esta solicitud ya fue registrada. Consulta su resultado antes de reintentar.',
            409
        );
    }

    const productos = await prepararProductos(items);

    const total = productos.reduce(
        (suma, item) => suma + item.subtotal,
        0
    );

    const cliente = await Cliente.findOneAndUpdate(
        {
            tipoDocumento: datosCliente.tipoDocumento,
            numeroDocumento: datosCliente.numeroDocumento.trim()
        },
        {
            $set: {
                nombres: datosCliente.nombres.trim(),
                apellidos: datosCliente.apellidos.trim(),
                telefono: datosCliente.telefono.trim(),
                correo: datosCliente.correo.trim().toLowerCase()
            }
        },
        {
            upsert: true,
            new: true,
            runValidators: true
        }
    );

    const pedido = await Pedido.create({
        claveSolicitud,
        cliente: cliente._id,
        items: productos,
        total,
        moneda: 'COP',
        estado: 'pendiente'
    });

    const pago = await Pago.create({
        pedido: pedido._id,
        cliente: cliente._id,
        referenciaTransaccion: `PF-${randomUUID()}`,
        metodoPago,
        monto: total,
        moneda: 'COP',
        estado: 'pendiente'
    });

    // Bloquear el pedido para este procesamiento.
    await Pedido.updateOne(
        { _id: pedido._id, estado: 'pendiente' },
        { $set: { estado: 'procesando' } }
    );

    // Simulación: 70 % aprobado, 30 % rechazado.
    const aprobado = Math.random() < 0.70;

    if (!aprobado) {
        await Pago.updateOne(
            { _id: pago._id },
            {
                $set: {
                    estado: 'rechazado',
                    mensajeResultado: 'Pago rechazado por PagoFacil.',
                    fechaProcesamiento: new Date()
                }
            }
        );

        await Pedido.updateOne(
            { _id: pedido._id },
            { $set: { estado: 'rechazado' } }
        );

        return {
            exito: true,
            estado: 'rechazado',
            mensaje: 'Pago rechazado. Puedes intentarlo nuevamente.',
            pedidoId: pedido._id,
            referenciaTransaccion: pago.referenciaTransaccion,
            total
        };
    }

    let descontados = [];

    try {
        descontados = await descontarInventario(productos);

        await Pago.updateOne(
            { _id: pago._id },
            {
                $set: {
                    estado: 'aprobado',
                    mensajeResultado: 'Pago aprobado por PagoFacil.',
                    fechaProcesamiento: new Date()
                }
            }
        );

        await Pedido.updateOne(
            { _id: pedido._id },
            {
                $set: {
                    estado: 'aprobado',
                    fechaAprobacion: new Date()
                }
            }
        );

        return {
            exito: true,
            estado: 'aprobado',
            mensaje: 'Pago aprobado correctamente.',
            pedidoId: pedido._id,
            referenciaTransaccion: pago.referenciaTransaccion,
            total
        };

    } catch (error) {
        // Si el inventario ya se descontó, intentar revertirlo.
        if (descontados.length > 0) {
            for (const item of [...descontados].reverse()) {
                await Producto.updateOne(
                    { _id: item.referenciaId },
                    { $inc: { stock: item.cantidad } }
                );
            }
        }

        await Pago.updateOne(
            { _id: pago._id },
            {
                $set: {
                    estado: 'pendiente',
                    mensajeResultado:
                        'Procesamiento incompleto; requiere revisión.'
                }
            }
        );

        await Pedido.updateOne(
            { _id: pedido._id },
            { $set: { estado: 'error' } }
        );

        throw new ErrorPago(
            'No se pudo confirmar el pedido. Revisa el estado antes de reintentar.',
            409
        );
    }
};

export const cancelarPedido = async id => {
    if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ErrorPago('Identificador inválido.');
    }

    const pedido = await Pedido.findOneAndUpdate(
        {
            _id: id,
            estado: { $in: ['pendiente', 'rechazado'] }
        },
        { $set: { estado: 'cancelado' } },
        { new: true }
    );

    if (!pedido) {
        throw new ErrorPago(
            'El pedido no existe o no puede cancelarse.',
            409
        );
    }

    return pedido;
};