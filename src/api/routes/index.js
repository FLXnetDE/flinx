const express = require('express');

const middlewares = require('../middlewares');
const authRoute = require('./auth');
const deviceRoute = require('./device');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/devices', middlewares.login.verifyToken, deviceRoute);

module.exports = router;
