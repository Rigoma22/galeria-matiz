
import { Router } from 'express';
import { obtenerProductos, obtenerProductoPorId } from '../controllers/productoController.js';

const router = Router();

// Ruta para consultar el catálogo completo de productos
router.get('/', obtenerProductos);

// Ruta para consultar un producto por su ID
router.get('/:id', obtenerProductoPorId);

export default router;
