const ProductModel = require('../models/productModel');

// Controlador para rutas públicas ('/')
const indexController = {
    // Al iniciar la página, cargar los productos
    loadProducts: async (req, res) => {
        try {
            // Carga de productos
            const products = ProductModel.loadProducts();
            // Enviar respuesta con productos
            res.render('index', { products: products })
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    },

    // Cerrar sesión
    destroySession: async (req, res) => {
        try {
            // Borrar datos de la sesión
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};

module.exports = indexController;
