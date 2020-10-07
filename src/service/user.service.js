const User = require('../database/schema/user.schema');

// Get all available users
async function getAllUsers() {
  const users = await User.find({});
  return users;
}

// Get a specific user by a given username
async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  return user;
}

// Handle user login
async function login(username, password) {
  return [username, password];
}

// Handle user registration
async function register(registrationBody) {
  return registrationBody;
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  login,
  register,
};
