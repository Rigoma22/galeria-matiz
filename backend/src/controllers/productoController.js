import Producto from '../models/Producto.js';
import mongoose from 'mongoose';

// Consultas de productos - parte del CRUD
// Controlador para obtener el catálogo de productos activos
export const obtenerProductos = async (req, res) => {
    try {
        //Obtener los parámetros de consulta y de paginación
        const { categoria, buscar, pagina = '1', limite = '9' } = req.query;
        
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

// Crear un nuevo producto - Parte del CRUD
export const crearProducto = async (req, res) => {
    try {
        const datos = req.body;

        // Verificar que se haya enviado un objeto.
        if (
            !datos ||
            typeof datos !== 'object' ||
            Array.isArray(datos)
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los datos del producto no son válidos.'
            });
        }

        // Campos obligatorios.
        const camposObligatorios = [
            'sku',
            'nombre',
            'slug',
            'categoria',
            'descripcion'
        ];

        const faltantes = camposObligatorios.filter(campo =>
            typeof datos[campo] !== 'string' ||
            !datos[campo].trim()
        );

        if (faltantes.length > 0) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Faltan campos obligatorios.',
                campos: faltantes
            });
        }

        // Validar precio.
        if (
            typeof datos.precio !== 'number' ||
            !Number.isFinite(datos.precio) ||
            datos.precio < 0
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El precio debe ser un número válido mayor o igual a cero.'
            });
        }

        // Validar inventario.
        if (
            !Number.isSafeInteger(datos.stock) ||
            datos.stock < 0
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El stock debe ser un entero mayor o igual a cero.'
            });
        }

        // Campos permitidos en la creación.
        const camposPermitidos = [
            'sku',
            'nombre',
            'slug',
            'categoria',
            'subcategoria',
            'tecnica',
            'autor',
            'descripcion',
            'palabrasClave',
            'precio',
            'moneda',
            'dimensiones',
            'materiales',
            'imagenes',
            'stock',
            'destacado',
            'obraUnica',
            'certificadoAutenticidad'
        ];

        const nuevoProducto = {};

        for (const campo of camposPermitidos) {
            if (Object.hasOwn(datos, campo)) {
                nuevoProducto[campo] = datos[campo];
            }
        }

        // Estado inicial controlado por el servidor.
        nuevoProducto.activo = true;
        nuevoProducto.datosFicticios = true;

        // Guardar en MongoDB.
        const producto = await Producto.create(nuevoProducto);

        return res.status(201).json({
            exito: true,
            mensaje: 'Producto creado correctamente.',
            producto
        });

    } catch (error) {

        // SKU o slug duplicado.
        if (error.code === 11000) {
            return res.status(409).json({
                exito: false,
                mensaje: 'Ya existe un producto con el SKU o slug indicado.',
                campos: Object.keys(error.keyPattern || {})
            });
        }

        // Errores de validación de Mongoose.
        if (
            error.name === 'ValidationError' ||
            error.name === 'CastError'
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los datos del producto no cumplen las validaciones.',
                detalles: error.message
            });
        }

        console.error(
            'Error al crear producto:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al crear el producto.'
        });
    }
};

// Actualizar un producto - Parte del CRUD
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        // Validar identificador.
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El identificador del producto no es válido.'
            });
        }

        // Validar cuerpo de la solicitud.
        if (
            !datos ||
            typeof datos !== 'object' ||
            Array.isArray(datos) ||
            Object.keys(datos).length === 0
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Debes proporcionar campos para actualizar.'
            });
        }

        // Campos que puede modificar el administrador.
        const camposPermitidos = [
            'sku',
            'nombre',
            'slug',
            'categoria',
            'subcategoria',
            'tecnica',
            'autor',
            'descripcion',
            'palabrasClave',
            'precio',
            'moneda',
            'dimensiones',
            'materiales',
            'imagenes',
            'stock',
            'destacado',
            'obraUnica',
            'certificadoAutenticidad'
        ];

        // Rechazar campos no autorizados.
        const camposInvalidos = Object.keys(datos).filter(
            campo => !camposPermitidos.includes(campo)
        );

        if (camposInvalidos.length > 0) {
            return res.status(400).json({
                exito: false,
                mensaje: 'La solicitud contiene campos no permitidos.',
                campos: camposInvalidos
            });
        }

        // Validaciones específicas de precio.
        if (
            Object.hasOwn(datos, 'precio') &&
            (
                typeof datos.precio !== 'number' ||
                !Number.isFinite(datos.precio) ||
                datos.precio < 0
            )
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El precio debe ser un número mayor o igual a cero.'
            });
        }

        // Validaciones específicas de inventario.
        if (
            Object.hasOwn(datos, 'stock') &&
            (
                !Number.isSafeInteger(datos.stock) ||
                datos.stock < 0
            )
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El stock debe ser un entero mayor o igual a cero.'
            });
        }

        // Validar campos de texto obligatorios.
        const camposTexto = [
            'sku',
            'nombre',
            'slug',
            'categoria',
            'descripcion'
        ];

        for (const campo of camposTexto) {
            if (
                Object.hasOwn(datos, campo) &&
                (
                    typeof datos[campo] !== 'string' ||
                    !datos[campo].trim()
                )
            ) {
                return res.status(400).json({
                    exito: false,
                    mensaje: `El campo ${campo} no puede estar vacío.`
                });
            }
        }

        // Actualizar únicamente productos activos.
        const producto = await Producto.findOne({
            _id: id,
            activo: true
        });

        if (!producto) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Producto activo no encontrado.'
            });
        }

        // Asignar los campos recibidos.
        for (const campo of camposPermitidos) {
            if (Object.hasOwn(datos, campo)) {
                producto.set(campo, datos[campo]);
            }
        }

        // Ejecutar validaciones del esquema.
        await producto.save();

        return res.status(200).json({
            exito: true,
            mensaje: 'Producto actualizado correctamente.',
            producto
        });

    } catch (error) {

        // Duplicidad de SKU o slug.
        if (error.code === 11000) {
            return res.status(409).json({
                exito: false,
                mensaje: 'Ya existe un producto con el SKU o slug indicado.'
            });
        }

        // Validaciones del modelo.
        if (
            error.name === 'ValidationError' ||
            error.name === 'CastError'
        ) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los datos del producto no son válidos.',
                detalles: error.message
            });
        }

        console.error(
            'Error al actualizar producto:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al actualizar el producto.'
        });
    }
};

// Eliminar un producto por su ID - parte del CRUD
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar identificador.
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El identificador del producto no es válido.'
            });
        }

        // Desactivar el producto.
        const producto = await Producto.findOneAndUpdate(
            {
                _id: id,
                activo: true
            },
            {
                $set: { activo: false }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Producto activo no encontrado.'
            });
        }

        return res.status(200).json({
            exito: true,
            mensaje: 'Producto retirado del catálogo correctamente.',
            producto: {
                _id: producto._id,
                sku: producto.sku,
                nombre: producto.nombre,
                activo: producto.activo
            }
        });

    } catch (error) {
        console.error(
            'Error al eliminar producto:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al retirar el producto.'
        });
    }
};


// Obtener todos los productos del catalogo
export const obtenerProductosAdmin = async (req, res) => {
    try {
        const {
            activo,
            buscar,
            pagina = '1',
            limite = '10'
        } = req.query;

        // Validar paginación.
        const numeroValido = valor =>
            typeof valor === 'string' &&
            /^[1-9]\d*$/.test(valor) &&
            Number.isSafeInteger(Number(valor));

        if (!numeroValido(pagina) ||
            !numeroValido(limite)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'La página y el límite deben ser enteros positivos.'
            });
        }

        const paginaActual = Number(pagina);
        const limiteProductos = Number(limite);

        if (limiteProductos > 50) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El límite máximo permitido es 50 productos.'
            });
        }

        // Construir filtros.
        const filtros = {};

        if (activo !== undefined) {
            if (activo !== 'true' && activo !== 'false') {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'El filtro activo debe ser true o false.'
                });
            }

            filtros.activo = activo === 'true';
        }

        // Búsqueda administrativa.
        if (buscar !== undefined) {
            if (typeof buscar !== 'string') {
                return res.status(400).json({
                    exito: false,
                    mensaje: 'El parámetro buscar debe ser texto.'
                });
            }

            if (buscar.trim()) {
                const textoSeguro = buscar.trim()
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                const expresion = new RegExp(textoSeguro, 'i');

                filtros.$or = [
                    { nombre: expresion },
                    { sku: expresion },
                    { slug: expresion },
                    { categoria: expresion }
                ];
            }
        }

        // Contar resultados.
        const totalProductos =
            await Producto.countDocuments(filtros);

        const totalPaginas = Math.ceil(
            totalProductos / limiteProductos
        );

        const saltar =
            (paginaActual - 1) * limiteProductos;

        // Consultar productos.
        const productos = await Producto.find(filtros)
            .sort({ nombre: 1, _id: 1 })
            .skip(saltar)
            .limit(limiteProductos)
            .lean();

        return res.status(200).json({
            exito: true,
            cantidad: productos.length,
            totalProductos,
            paginacion: {
                paginaActual,
                limite: limiteProductos,
                totalPaginas,
                paginaAnterior:
                    paginaActual > 1 &&
                    paginaActual <= totalPaginas
                        ? paginaActual - 1
                        : null,
                paginaSiguiente:
                    paginaActual < totalPaginas
                        ? paginaActual + 1
                        : null
            },
            productos
        });

    } catch (error) {
        console.error(
            'Error en consulta administrativa:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al consultar productos.'
        });
    }
};


//Reactivar un producto previamente desactivado.
export const reactivarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar identificador.
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'El identificador del producto no es válido.'
            });
        }

        // Buscar únicamente productos inactivos.
        const producto = await Producto.findOneAndUpdate(
            {
                _id: id,
                activo: false
            },
            {
                $set: { activo: true }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            // Determinar si no existe o ya está activo.
            const existente = await Producto.findById(id)
                .select('_id activo')
                .lean();

            if (!existente) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Producto no encontrado.'
                });
            }

            return res.status(409).json({
                exito: false,
                mensaje: 'El producto ya se encuentra activo.'
            });
        }

        return res.status(200).json({
            exito: true,
            mensaje: 'Producto reactivado correctamente.',
            producto: {
                _id: producto._id,
                sku: producto.sku,
                nombre: producto.nombre,
                stock: producto.stock,
                activo: producto.activo
            }
        });

    } catch (error) {
        console.error(
            'Error al reactivar producto:',
            error.message
        );

        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno al reactivar el producto.'
        });
    }
};
