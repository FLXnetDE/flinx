const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../../middlewares/customError');

const { JWT_SECRET } = process.env;

const app = express();

app.use(express.json());

// Register new user
app.post('/register', (req, res) => {
});

// Process login request with username & password
app.post('/login', (req, res, next) => {
});

// Process logout request
app.get('/logout', (req, res) => res.status(200).json({ auth: false, token: null }));

// Get user info
app.get('/me', (req, res, next) => {
});

module.exports = app;
