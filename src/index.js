require('dotenv').config();
require('./database');
const api = require('./api');

const { PORT } = process.env;

api.listen(PORT, () => {
  console.log(`flinx HTTP API listening at port ${PORT}`);
});
