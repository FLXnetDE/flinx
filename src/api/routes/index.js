const express = require('express');

const middlewares = require('../middlewares');
const authRoute = require('./auth');
const deviceRoute = require('./device');
const channelRoute = require('./channel');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/devices', middlewares.login.verifyToken, deviceRoute);
router.use('/channels', middlewares.login.verifyToken, channelRoute);

module.exports = router;
