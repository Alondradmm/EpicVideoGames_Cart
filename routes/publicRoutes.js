const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Rutas públicas - Principal y cerrar sesión
router.get('/', indexController.loadProducts);
router.get('/logout', indexController.destroySession);
router.post('/register', indexController.registerUser);

module.exports = router;
