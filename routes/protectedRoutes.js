const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

// Ruta protegida por JWT - Manejo del carrito
router.get('/carrito', authMiddleware, cartController.getCart);
router.post('/carrito/add/:id', authMiddleware, cartController.addItemToCart);
router.put('/carrito/update/:id', authMiddleware, cartController.increaseItemCartCount);
router.delete('/carrito/remove/:id', authMiddleware, cartController.removeItemFromCart);
router.delete('/carrito/clear', authMiddleware, cartController.clearCart);
router.put('/carrito/confirm', authMiddleware, cartController.confirmCartPayment);

module.exports = router;