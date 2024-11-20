import express from 'express';
import { getUserData, getUserOrders } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta protegida para obtener los datos del usuario
router.get('/datos', authMiddleware, getUserData);

// Ruta protegida para obtener los pedidos del usuario
router.get('/pedidos', authMiddleware, getUserOrders);

export default router;