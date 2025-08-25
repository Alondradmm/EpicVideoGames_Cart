const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const CartModel = require('../models/cartModel');

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
    },

    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            // Crear nuevo usuario en el modelo
            const user = UserModel.createUser(username, password);
            CartModel.createUserCart(user.id)
            if (!user) {
                return res.status(401).json({ error: 'Error al crear el usuario' });
            }
            res.status(201).json({ message: 'Usuario creado. Inicia Sesión', user: user });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};

module.exports = indexController;
