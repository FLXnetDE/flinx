const express = require('express');
const channelService = require('../../../service/channel.service');
const CustomError = require('../../../util/customError');
const { aedes } = require('../../../mqtt');

const app = express();
app.use(express.json());

// Get all channels of a user
app.get('/', async (req, res, next) => {
  try {
    const channels = await channelService.getChannels(req.userId);
    res.json(channels);
  } catch (err) {
    next(new CustomError(500, 'Could not load channels'));
  }
});

// Get a channel by a given id
app.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const channel = await channelService.getChannel(req.userId, id);
    if (channel) {
      res.json(channel);
    } else {
      next(new CustomError(404, 'Channel with this id has not been found'));
    }
  } catch (err) {
    next(new CustomError(500, 'Could not load channel'));
  }
});

// Create a new channel
app.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const newChannel = await channelService.createChannel(req.userId, body);
    if (newChannel) {
      res.json(newChannel);
    } else {
      next(new CustomError(500, 'Could not create a new channel'));
    }
  } catch (err) {
    next(new CustomError(500, 'Could not create a new channel'));
  }
});

// Delete a channel by given id
app.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await channelService.deleteChannel(req.userId, id);
    const channels = await channelService.getChannels(req.userId);
    res.json(channels);
  } catch (err) {
    next(new CustomError(500, 'Could not delete channel'));
  }
});

// Allow a device to access the given channel
app.post('/allow/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedChannel = await channelService.allowDevice(req.userId, id, body.deviceId);
    res.json(updatedChannel);
  } catch (err) {
    next(new CustomError(500, 'Could not allow a new device for this channel'));
  }
});

// Remove a device from the list of allowed devices of channel
app.post('/disallow/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedChannel = await channelService.disallowDevice(req.userId, id, body.deviceId);
    res.json(updatedChannel);
  } catch (err) {
    next(new CustomError(500, 'Could not allow a new device for this channel'));
  }
});

// Make an internal MQTT publish via HTTP API request
app.post('/publish/:id', async (req, res, next) => {
  const { id } = req.params;
  const { payload } = req.body;
  try {
    const channel = await channelService.getChannel(req.userId, id);
    if (!channel) {
      next(new CustomError(404, 'Channel not found'));
    } else {
      const packet = {
        topic: channel.topic,
        payload,
      };
      aedes.publish(packet, (publishErr) => {
        if (publishErr) {
          next(new CustomError(500, 'Internal publish failed!'));
        } else {
          res.json({
            message: 'Internal publish successfully completed.',
          });
        }
      });
    }
  } catch (err) {
    next(new CustomError(500, err));
  }
});

module.exports = app;
