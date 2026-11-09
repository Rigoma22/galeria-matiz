import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productoRoutes from './routes/productoRoutes.js';

import conectarDB from './config/database.js';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configurar middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

// Rutas de productos
app.use('/api/productos', productoRoutes);

// Primera ruta de prueba
app.get('/api/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        mensaje: 'API ArtShop MATIZ funcionando'
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 4000;

// Iniciar servidor después de conectar MongoDB
const iniciarServidor = async () => {
    await conectarDB();

    app.listen(PORT, () => {
        console.log(
            `Servidor ArtShop activo en http://localhost:${PORT}`
        );
    });
};

iniciarServidor();