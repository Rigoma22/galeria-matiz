
import Pedido from '../models/Pedido.js';
import Pago from '../models/Pago.js';

import {
    procesarPago,
    cancelarPedido
} from '../services/pagoService.js';

export const simularPago = async (req, res) => {
    try {
        const resultado = await procesarPago(req.body);

        return res.status(200).json(resultado);

    } catch (error) {
        console.error('Error PagoFacil:', error.message);

        return res.status(error.codigo || 500).json({
            exito: false,
            mensaje: error.codigo
                ? error.message
                : 'Error interno al procesar el pago.'
        });
    }
};

export const consultarPago = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({
            claveSolicitud: req.params.claveSolicitud
        }).lean();

        if (!pedido) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Solicitud no encontrada.'
            });
        }

        const pago = await Pago.findOne({
            pedido: pedido._id
        }).lean();

        return res.status(200).json({
            exito: true,
            pedidoId: pedido._id,
            estado: pedido.estado,
            total: pedido.total,
            referenciaTransaccion:
                pago?.referenciaTransaccion || null
        });

    } catch {
        return res.status(500).json({
            exito: false,
            mensaje: 'No se pudo consultar el pago.'
        });
    }
};

export const cancelarPago = async (req, res) => {
    try {
        const pedido = await cancelarPedido(
            req.params.id
        );

        return res.status(200).json({
            exito: true,
            estado: pedido.estado,
            mensaje: 'Pedido cancelado correctamente.'
        });

    } catch (error) {
        return res.status(error.codigo || 500).json({
            exito: false,
            mensaje: error.message
        });
    }
};