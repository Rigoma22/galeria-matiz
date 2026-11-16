import { Router } from 'express';
import { 
    obtenerProductos, 
    obtenerProductoPorId, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto,
    obtenerProductosAdmin,
    reactivarProducto 
}  from '../controllers/productoController.js';

const router = Router();

//Rutas del CRUD de productos
// Consultar el catálogo completo de productos activos
router.get('/', obtenerProductos);

// Consultar productos completos para administración
router.get('/admin', obtenerProductosAdmin);

// Consultar un producto activo por su ID
router.get('/:id', obtenerProductoPorId);

// Crear un producto.
router.post('/', crearProducto);

// Actualizar un producto por su ID
router.patch('/:id', actualizarProducto);

// Eliminar un producto por su ID
router.delete('/:id', eliminarProducto);

// Reactivar un producto previamente desactivado
router.patch('/:id/reactivar', reactivarProducto);

export default router;