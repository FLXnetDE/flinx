const mongoose = require('mongoose');

const { Schema } = mongoose;
const dataSchema = require('./data.schema');

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  allowedDevices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
  data: [dataSchema],
}, {
  timestamps: true,
});

const Channel = mongoose.model('Channel', channelSchema, 'channels');

module.exports = Channel;
