const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();

// Middlewares
dotenv.config();
app.use(express.json()); // Para parsear/convertir json
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'session-key', 
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
})); 
require('./config/oauth')

app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Si no hay user, será null
    next();
});

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const googleRoutes = require('./routes/googleRoutes');

// Usar rutas
app.use('/api', authRoutes);
app.use('/', publicRoutes);
app.use('/', googleRoutes);
app.use('/api', protectedRoutes);

// Configuración del puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});