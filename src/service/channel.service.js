const randomstring = require('randomstring');
const Channel = require('../database/schema/channel.schema');

// Get all channels of a given user
async function getChannels(userId) {
  const channels = await Channel.find({ user: userId });
  return channels;
}

// Get a channel of a given user by given id
async function getChannel(userId, id) {
  const channel = await Channel.findOne({ user: userId, _id: id });
  return channel;
}

// Create a new channel for a given userId with body content
async function createChannel(userId, channel) {
  const c = new Channel(channel);
  c.topic = `/${randomstring.generate(16)}`;
  c.user = userId;
  const newChannel = await c.save();
  return newChannel;
}

// Add a device to the allowedDevices array of a channel
async function allowDevice(userId, id, deviceId) {
  const channel = await Channel.findOneAndUpdate({
    user: userId,
    _id: id,
  }, {
    $addToSet: {
      allowedDevices: deviceId,
    },
  }, {
    new: true,
  });
  return channel;
}

// Remove a device from the allowedDevices array of a channel
async function disallowDevice(userId, id, deviceId) {
  const channel = await Channel.findOneAndUpdate({
    user: userId,
    _id: id,
  }, {
    $unset: {
      allowedDevices: deviceId,
    },
  }, {
    new: true,
  });
  return channel;
}

// Delete a channel by a given id
async function deleteChannel(userId, id) {
  const deleted = await Channel.deleteOne({ _id: id, user: userId });
  return deleted;
}

// Add a data packet into the channels data array
async function addData(topic, data) {
  await Channel.findOneAndUpdate({
    topic,
  }, {
    $push: {
      data,
    },
  });
}

// Handle authorization for publishes
function authorizePublish(client, packet, callback) {
  const { id } = client;
  const { topic } = packet;
  Channel.findOne({
    topic,
  })
    .populate('allowedDevices')
    .exec()
    .then((channel) => {
      if (!channel) {
        callback(new Error('Unauthorized publish'));
        return;
      }
      const filter = channel.allowedDevices.filter((device) => device.deviceId === id);
      if (filter.length) {
        callback(null);
      } else {
        callback(new Error('Unauthorized publish'));
      }
    })
    .catch((err) => console.log(err));
}

// Handle authorization for subscriptions
function authorizeSubscribe(client, sub, callback) {
  const { id } = client;
  const { topic } = sub;
  Channel.findOne({
    topic,
  })
    .populate('allowedDevices')
    .exec()
    .then((channel) => {
      if (!channel) {
        callback(new Error('Unauthorized subscribe'));
        return;
      }
      const filter = channel.allowedDevices.filter((device) => device.deviceId === id);
      if (filter.length) {
        callback(null, sub);
      } else {
        callback(new Error('Unauthorized subscribe'));
      }
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getChannels,
  getChannel,
  createChannel,
  deleteChannel,
  authorizePublish,
  authorizeSubscribe,
  allowDevice,
  disallowDevice,
  addData,
};
