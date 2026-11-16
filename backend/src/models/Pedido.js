import mongoose from 'mongoose';

const itemPedidoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: [
            'producto',
            'curso',
            'entrada',
            'reserva_grupal'
        ],
        required: true
    },

    referenciaId: {
        type: String,
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    cantidad: {
        type: Number,
        required: true,
        min: 1,
        validate: Number.isSafeInteger
    },

    precioUnitario: {
        type: Number,
        default: null,
        min: 0
    },

    subtotal: {
        type: Number,
        required: true,
        min: 0
    },

    detalles: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    _id: false
});

const pedidoSchema = new mongoose.Schema({
    claveSolicitud: {
        type: String,
        required: true,
        unique: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    items: {
        type: [itemPedidoSchema],
        required: true,
        validate: {
            validator: items => items.length > 0,
            message: 'El pedido debe contener artículos.'
        }
    },

    total: {
        type: Number,
        required: true,
        min: 0
    },

    moneda: {
        type: String,
        default: 'COP',
        enum: ['COP']
    },

    estado: {
        type: String,
        enum: [
            'pendiente',
            'procesando',
            'aprobado',
            'rechazado',
            'cancelado',
            'error'
        ],
        default: 'pendiente'
    },

    fechaAprobacion: {
        type: Date,
        default: null
    }
}, {
    collection: 'pedidos',
    timestamps: true,
    versionKey: false
});

pedidoSchema.index({ cliente: 1, createdAt: -1 });

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;