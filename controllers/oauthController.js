const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwtConfig');
const CartModel = require('../models/cartModel');

// Controlador para las rutas de oAuth (Google)
const oauthController = {
    // Google Callback (una vez de dar autorización)
    googleCallback: async (req, res, next) => {
        // Se llama al servicio de oauth.js (config) y recibe el perfil del usuario autenticado
        passport.authenticate('google', { session: false }, async (err, google_user) => {
            // En caso de fallos enviar un error
            if (err || !google_user) {
                return res.redirect('/?error=Error con oAuth. Intenta de nuevo.');
            }

            // Obtener el usuario de la BD por medio del email de Google
            let user = UserModel.findByEmail(google_user.email);

            // Si no existe el usuario
            if (!user) {
                // Se crea un nuevo usuario - Usuario + Carrito de compra
                user = await UserModel.addUserByEmail(google_user.displayName, google_user.email)
                await CartModel.createUserCart(user.id)
            }

            // Crear payload para el token (sin información sensible)
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            req.session.user = user.username
            // Generar token JWT
            const token = jwt.sign(payload, secret, { expiresIn });
            // Redirigir al frontend
            /* 
                NOTA: En este caso no se puede redirigir tal cual un json{token} 
                porque al ser servicio de terceros, 
                no es posible hacer fetch a esta ruta
            */
            res.redirect(`/?token=${token}`)
        })(req, res, next); 
    }
};

module.exports = oauthController;
