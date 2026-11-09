import mongoose from 'mongoose';

// Función encargada de conectar la API con MongoDB
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB conectado correctamente');
        console.log(`Base de datos: ${mongoose.connection.name}`);

    } catch (error) {
        console.error(
            'Error al conectar MongoDB:',
            error.message
        );

        process.exit(1);
    }
};

export default conectarDB;