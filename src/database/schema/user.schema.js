const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
  group: {
    type: String,
    default: 'user',
  },
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
