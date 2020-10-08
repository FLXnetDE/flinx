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

// Set the last login of a given user
async function setLastLogin(id, date = Date.now()) {
  const updatedUser = await User.findOneAndUpdate({
    _id: id,
  }, {
    $set: {
      lastLogin: date,
    },
  }, {
    new: true,
  });
  return updatedUser;
}

// ToDo: Handle user login
async function login(username, password) {
  setLastLogin(null, null);
  return [username, password];
}

// ToDo: Handle user registration
async function register(registrationBody) {
  return registrationBody;
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  login,
  register,
};
