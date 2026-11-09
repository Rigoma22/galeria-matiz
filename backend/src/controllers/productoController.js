import Producto from '../models/Producto.js';
import mongoose from 'mongoose';

// Controlador para obtener el catálogo de productos
export const obtenerProductos = async (req, res) => {
    try {
        //Obtener los parámetros de consulta y de paginación
        const { categoria, buscar, pagina = 1, limite = 9 } = req.query;
        
        // Validar los parámetros numéricos
        const numeroValido = (valor) =>
            typeof valor === 'string' &&
            /^[1-9]\d*$/.test(valor) &&
            Number.isSafeInteger(Number(valor));

        if (!numeroValido(pagina) || !numeroValido(limite)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'La página y el límite deben ser enteros positivos'
            });
        }

        const paginaActual = Number(pagina);
        const limiteProductos = Number(limite);

        // Evitar consultas excesivamente grandes
        if (limiteProductos > 50) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El límite máximo permitido es 50 productos'
            });
        }

        // Construir el filtro de consulta
        const filtros = {activo: true};

        //filtro por categoría si se proporciona
        if (typeof categoria === 'string' && categoria.trim()) {
            filtros.categoria = categoria.trim();
        }

        // Buscar coincidencias en distintos campos
        if (typeof buscar === 'string' && buscar.trim()) {

            // Escapar caracteres especiales de expresiones regulares
            const textoSeguro = buscar.trim()
                .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const expresionBusqueda = new RegExp(
                textoSeguro,
                'i'
            );

            filtros.$or = [
                { nombre: expresionBusqueda },
                { descripcion: expresionBusqueda },
                { palabrasClave: expresionBusqueda }
            ];
        }

         // Contar documentos que cumplen los filtros
        const totalProductos = await Producto.countDocuments(filtros);

        // Calcular cantidad de páginas
        const totalPaginas = Math.ceil(
            totalProductos / limiteProductos
        );

        // Calcular documentos que debemos omitir
        const saltar = (paginaActual - 1) * limiteProductos;

        // Consultar MongoDB
        const productos = await Producto.find(filtros)
            .sort({ nombre: 1, _id: 1 })
            .skip(saltar)
            .limit(limiteProductos)
            .lean();

        // Responder con los resultados
        res.status(200).json({
            exito: true,
            cantidad: productos.length,
            totalProductos,
            paginacion: {
                paginaActual,
                limite: limiteProductos,
                totalPaginas,
                paginaAnterior: paginaActual > 1 &&
                    paginaActual <= totalPaginas + 1
                        ? paginaActual - 1
                        : null,
                paginaSiguiente: paginaActual < totalPaginas
                    ? paginaActual + 1
                    : null
            },
            productos
        });

    } catch (error) {
        console.error(
            'Error al consultar productos:',
            error.message
        );

        res.status(500).json({
            exito: false,
            mensaje: 'Error interno al consultar productos'
        });
    }
};

// Obtener un producto por su identificador
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar el formato del identificador
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El identificador del producto no es válido'
            });
        }

        // Consultar el producto en MongoDB
        const producto = await Producto.findOne({
            _id: id,
            activo: true
        }).lean();

        // Verificar si existe
        if (!producto) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Producto no encontrado'
            });
        }

        // Respuesta exitosa
        return res.status(200).json({
            exito: true,
            producto
        });

    } catch (error) {
        console.error(
            'Error al consultar producto:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al consultar el producto'
        });
    }
};
