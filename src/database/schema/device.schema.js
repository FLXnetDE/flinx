const mongoose = require('mongoose');

const { Schema } = mongoose;

const deviceSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  deviceKey: {
    type: String,
    required: true,
  },
  deviceSecret: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  locked: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

const Device = mongoose.model('Device', deviceSchema, 'devices');

module.exports = Device;
