const express = require('express');

const authRoute = require('./auth');
const deviceRoute = require('./device');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/devices', deviceRoute);

module.exports = router;
