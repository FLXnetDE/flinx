const mongoose = require('mongoose');

const { Schema } = mongoose;

const dataSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
  },
  payload: {
    type: String,
  },
  dateReceived: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = dataSchema;
