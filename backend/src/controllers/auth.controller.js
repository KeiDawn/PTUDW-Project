const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const userModel = require('../models/user.model');
const { validateRegister } = require('../validators/auth.validator');

const register = async (req, res) => {
  const { email, password } = req.body;

  const { isValid, errors } = validateRegister({ email, password });
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }

  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Email is not available'
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.createUser({
    email,
    password: hashedPassword,
    role: 'client',
    is_active: true
  });

  return res.json({
    success: true,
    message: 'Register successful'
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  if (!user.is_active) {
    return res.status(403).json({
      success: false,
      message: 'Account is disabled'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const token = jwt.sign(
    {
      user_id: user.id,
      role: user.role
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
};

module.exports = {
  register,
  login
};
