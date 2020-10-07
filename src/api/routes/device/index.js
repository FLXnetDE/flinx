const express = require('express');
const deviceService = require('../../../service/device.service');
const CustomError = require('../../middlewares/customError');

const app = express();
app.use(express.json());

// Get all devices of a user
app.get('/', async (req, res, next) => {
  try {
    const devices = await deviceService.getDevices(req.userId);
    res.json(devices);
  } catch (err) {
    next(new CustomError(500, 'Could not load devices'));
  }
});

// Get a device by a given id
app.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const device = await deviceService.getDevice(id);
    if (device) {
      res.json(device);
    } else {
      next(new CustomError(404, 'Device with this id has not been found'));
    }
  } catch (err) {
    next(new CustomError(500, 'Could not load device'));
  }
});

// Create a new device
app.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const newDevice = await deviceService.createDevice(body, req.userId);
    if (newDevice) {
      res.json(newDevice);
    } else {
      next(new CustomError(500, 'Could not create a new device'));
    }
  } catch (err) {
    next(new CustomError(500, 'Could not create a new device'));
  }
});

// Delete a device by given id
app.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await deviceService.deleteDevice(id, req.userId);
    const devices = await deviceService.getDevices(req.userId);
    res.json(devices);
  } catch (err) {
    next(new CustomError(500, 'Could not delete device'));
  }
});

module.exports = app;
