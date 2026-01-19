const jwt = require('jsonwebtoken');
const getJwtConfig = require('../config/jwt');
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtConfig = getJwtConfig();

    const decoded = jwt.verify(token, jwtConfig.secret);

    const user = await userModel.findById(decoded.user_id);

    if (!user || !user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account is disabled'
      });
    }

    req.user = {
      user_id: user.id,
      role: user.role
    };

    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
};
