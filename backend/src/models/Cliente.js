import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    tipoDocumento: {
        type: String,
        enum: ['CC', 'CE', 'TI', 'PASAPORTE', 'OTRO'],
        required: true
    },

    numeroDocumento: {
        type: String,
        required: true,
        trim: true
    },

    nombres: {
        type: String,
        required: true,
        trim: true
    },

    apellidos: {
        type: String,
        required: true,
        trim: true
    },

    telefono: {
        type: String,
        required: true,
        trim: true
    },

    correo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
}, {
    collection: 'clientes',
    timestamps: true,
    versionKey: false
});

// Evitar duplicar clientes por documento.
clienteSchema.index(
    { tipoDocumento: 1, numeroDocumento: 1 },
    { unique: true }
);

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;