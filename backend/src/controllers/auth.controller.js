const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getJwtConfig = require('../config/jwt');
const userModel = require('../models/user.model');
const { validateRegister } = require('../validators/auth.validator');
const {
  successResponse,
  errorResponse
} = require('../utils/response');

/**
 * POST /auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const { isValid, errors } = validateRegister({ email, password });
    if (!isValid) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Validation error',
        errors
      });
    }

    // Check email exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, {
        statusCode: 400,
        message: 'Email is not available'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await userModel.createUser({
      email,
      password: hashedPassword,
      role: 'client',
      is_active: true
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Register successful'
    });
  } catch (err) {
    console.error('Register error:', err);
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

/**
 * POST /auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await userModel.findByEmail(email);
    if (!user) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Invalid email or password'
      });
    }

    // Check active
    if (!user.is_active) {
      return errorResponse(res, {
        statusCode: 403,
        message: 'Account is disabled'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const jwtConfig = getJwtConfig();
    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    return successResponse(res, {
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return errorResponse(res, {
      statusCode: 500,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  register,
  login
};
