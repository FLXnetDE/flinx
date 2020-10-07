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
  c.userId = userId;
  const newChannel = await channel.save();
  return newChannel;
}

// Delete a channel by a given id
async function deleteChannel(userId, id) {
  const deleted = await Channel.deleteOne({ _id: id, userId });
  return deleted;
}

module.exports = {
  getChannels,
  getChannel,
  createChannel,
  deleteChannel,
};
