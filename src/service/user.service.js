const User = require('../database/schema/user.schema');

async function getAll() {
  const users = await User.find({});
  return users;
}

async function getUserByUsername(username) {
  const user = await User.find({
    username,
  });
  return user;
}

module.exports = {
  getAll,
  getUserByUsername,
};
