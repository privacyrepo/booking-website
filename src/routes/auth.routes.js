const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register',
  [
    body('username').notEmpty().withMessage('Username must not be empty'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  AuthController.register
);

router.post('/login',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password must not be empty'),
  ],
  AuthController.login
);

module.exports = router;
