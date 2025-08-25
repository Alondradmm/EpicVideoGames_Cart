// Configuración para enviar solicitudes a la API de Google
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// ClientID y ClientSecret declaradas en variables de entorno
passport.use(new GoogleStrategy({
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
    },
    // Función que retorna error:null, y el perfil de usuario (profile)
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));