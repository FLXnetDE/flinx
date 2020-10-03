const CustomError = require('./customError');

function notFound(req, res, next) {
  next(new CustomError(404, `🔍 - Not Found - ${req.originalUrl}`));
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = err.code ? err.code : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
