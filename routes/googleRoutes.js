const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');
const passport = require('passport')

// Ruta para oAuth con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));
router.get('/auth/google/callback', oauthController.googleCallback);

module.exports = router;
