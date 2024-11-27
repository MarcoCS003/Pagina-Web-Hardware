import express from 'express';
import { Link } from 'react-router-dom';

const router = express.Router();

// Almacenamiento en memoria para el carrito
let carritos = {}; // Estructura: { userId: [{ productoId, cantidad }] }

// Añadir producto al carrito
router.post('/add', (req, res) => {
  const { userId, productoId, cantidad } = req.body;

  if (!userId || !productoId || !cantidad) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  // Si no existe un carrito para el usuario, inicializarlo
  if (!carritos[userId]) {
    carritos[userId] = [];
  }

  // Verificar si el producto ya está en el carrito
  const productoExistente = carritos[userId].find(item => item.productoId === productoId);

  if (productoExistente) {
    // Actualizar la cantidad
    productoExistente.cantidad += cantidad;
  } else {
    // Agregar nuevo producto al carrito
    carritos[userId].push({ productoId, cantidad });
  }

  res.json({ message: 'Producto añadido al carrito', carrito: carritos[userId] });
});

// Obtener contenido del carrito
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!carritos[userId]) {
    return res.status(404).json({ message: 'Carrito no encontrado para este usuario' });
  }

  res.json(carritos[userId]);
});

// Eliminar producto del carrito
router.delete('/remove', (req, res) => {
  const { userId, productoId } = req.body;

  if (!userId || !productoId) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  if (!carritos[userId]) {
    return res.status(404).json({ message: 'Carrito no encontrado para este usuario' });
  }

  carritos[userId] = carritos[userId].filter(item => item.productoId !== productoId);

  res.json({ message: 'Producto eliminado del carrito', carrito: carritos[userId] });
});

// Actualizar cantidad de un producto en el carrito
router.put('/update', (req, res) => {
  const { userId, productoId, cantidad } = req.body;

  if (!userId || !productoId || cantidad === undefined) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  if (!carritos[userId]) {
    return res.status(404).json({ message: 'Carrito no encontrado para este usuario' });
  }

  const productoExistente = carritos[userId].find(item => item.productoId === productoId);

  if (!productoExistente) { 
    return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
  }

  productoExistente.cantidad = cantidad;

  res.json({ message: 'Cantidad actualizada', carrito: carritos[userId] });
});

export default router;