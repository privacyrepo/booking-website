const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const httpStatusCodes = require('http-status-codes');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };