const db = require('../database');

const users = db.get('users');

async function getAll() {
  const result = await users.find({});
  return result;
}

module.exports = {
  getAll,
};
