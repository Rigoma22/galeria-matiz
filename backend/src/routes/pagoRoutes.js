
import { Router } from 'express';

import {
    simularPago,
    consultarPago,
    cancelarPago
} from '../controllers/pagoController.js';

const router = Router();

router.post('/simular', simularPago);
router.get('/solicitud/:claveSolicitud', consultarPago);
router.patch('/pedidos/:id/cancelar', cancelarPago);

export default router;