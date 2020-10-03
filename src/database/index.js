const monk = require('monk');

const { MONGODB_URI } = process.env;

const db = monk(MONGODB_URI, (err) => {
  if (err) {
    console.log('MongoDB connection could not be established', err);
    return;
  }
  console.log('MongoDB connection has been established');
});

module.exports = db;
