const express = require('express');
const { AuthController } = require('./auth.controller.js');
const { authMiddleware } = require('../../middlewares/auth.middleware.js');

const authController = new AuthController();
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getProfile);

module.exports = router;