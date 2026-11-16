import mongoose from 'mongoose';

const pagoSchema = new mongoose.Schema({
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    referenciaTransaccion: {
        type: String,
        required: true,
        unique: true
    },

    metodoPago: {
        type: String,
        enum: ['debito', 'credito'],
        required: true
    },

    monto: {
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
            'aprobado',
            'rechazado',
            'cancelado'
        ],
        default: 'pendiente'
    },

    mensajeResultado: {
        type: String,
        default: ''
    },

    fechaProcesamiento: {
        type: Date,
        default: null
    }
}, {
    collection: 'pagos',
    timestamps: true,
    versionKey: false
});

pagoSchema.index({ pedido: 1, createdAt: -1 });
pagoSchema.index({ cliente: 1, createdAt: -1 });

const Pago = mongoose.model('Pago', pagoSchema);

export default Pago;