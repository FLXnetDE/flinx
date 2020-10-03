const jwt = require('jsonwebtoken');
const CustomError = require('./customError');

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    next(new CustomError(403, 'No token provided'));
    return;
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      next(new CustomError(403, 'Failed to authenticate token'));
      return;
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken,
};
