import mongoose from 'mongoose';

// Subdocumento que representa al autor de una obra
const autorSchema = new mongoose.Schema({
    nombre: String
}, {
    _id: false,
    strict: false
});

// Subdocumento de dimensiones
const dimensionesSchema = new mongoose.Schema({}, {
    _id: false,
    strict: false
});

// Esquema principal de productos
const productoSchema = new mongoose.Schema({

    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    categoria: {
        type: String,
        required: true
    },

    subcategoria: {
        type: String
    },

    tecnica: {
        type: String
    },

    autor: {
        type: autorSchema,
        default: null
    },

    descripcion: {
        type: String,
        required: true
    },

    palabrasClave: {
        type: [String],
        default: []
    },

    precio: {
        type: Number,
        required: true,
        min: 0
    },

    moneda: {
        type: String,
        default: 'COP'
    },

    dimensiones: {
        type: dimensionesSchema
    },

    materiales: {
        type: [String],
        default: []
    },

    imagenes: {
        type: [String],
        default: []
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    activo: {
        type: Boolean,
        default: true
    },

    destacado: {
        type: Boolean,
        default: false
    },

    obraUnica: {
        type: Boolean,
        default: false
    },

    certificadoAutenticidad: {
        type: Boolean,
        default: false
    },

    datosFicticios: {
        type: Boolean,
        default: true
    }

}, {
    collection: 'productos',
    versionKey: false
});

// Crear y exportar el modelo
const Producto = mongoose.model('Producto', productoSchema);

export default Producto;