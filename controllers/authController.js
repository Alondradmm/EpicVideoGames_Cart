const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwtConfig');

const authController = {
    // Controlador para el login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            // Validar credenciales con el modelo
            const user = UserModel.findByCredentials(username, password);
            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            
            // Crear payload para el token (sin información sensible)
            const payload = {
                id: user.id,
                username: user.username,
                role: user.role
            };
            
            // Se guarda el nombre de usuario en session para mostrarlo en la interfaz
            req.session.user = user.username
            // Generar token JWT
            const token = jwt.sign(payload, secret, { expiresIn });
            
            // Enviar respuesta con token
            res.user = user.username
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
};

module.exports = authController;
