// Cofiguración para JWT (JSON Web Tokens)
module.exports = {
    secret: process.env.PORT, // clave secreta para firmar tokens (Desde variables de entorno)
    expiresIn: '1h', // Tiempo de expiración del token
};