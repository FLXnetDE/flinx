const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../../middlewares/customError');
const User = require('../../../database/schema/user.schema');
const middlewares = require('../../middlewares');

const { JWT_SECRET } = process.env;

const app = express();
app.use(express.json());

// Register new user
app.post('/register', (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  newUser.save((err, user) => {
    if (err) return next(new CustomError(500, 'There was a problem registering the user'));

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    return res.json({
      auth: true,
      token,
    });
  });
});

// Process login request with username & password
app.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) {
      return next(new CustomError(500, err));
    }
    if (!doc) {
      return next(new CustomError(404, 'User not found'));
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, doc.password);
    if (!passwordIsValid) {
      return next(new CustomError(401, 'Password is not valid'));
    }

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: doc._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    const user = {
      username: doc.username,
      email: doc.email,
      group: doc.group,
    };

    return res.json({
      token,
      user,
    });
  });
});

// Process logout request
app.get('/logout', (req, res) => res.json({ token: null }));

// Get user info
app.get('/me', middlewares.login.verifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) return next(new CustomError(500, err));
    if (!user) return next(new CustomError(404, 'User not found'));
    return res.json(user);
  });
});

module.exports = app;
