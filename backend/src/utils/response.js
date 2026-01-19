/**
 * Success response
 */
const successResponse = (res, {
  message = 'OK',
  data = null,
  statusCode = 200
}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Error response
 */
const errorResponse = (res, {
  message = 'Error',
  errors = null,
  statusCode = 400
}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = {
  successResponse,
  errorResponse
};
