const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');

// Middleware para verificar eltokens JWT
const authMiddleware = (req, res, next) => {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    // Verificar si existe el token
    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    
    // Separar "Bearer" del token
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Formato de token inválido' });
    }
    
    const token = tokenParts[1];
    
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secret);
        // Añadir usuario decodificado a la solicitud
        req.user = decoded;
        // Continuar al siguiente middleware/que es la ruta
        next();
    } catch (error) {
        // Manejar errores de token inválido/expirado
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;