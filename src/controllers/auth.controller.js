const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const httpStatusCodes = require('http-status-codes');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Email already in use' });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
    res.status(httpStatusCodes.CREATED).json({ token });
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error registering the user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error logging in' });
  }
};
