require('dotenv').config();
require('./database');
const api = require('./api');
const { server } = require('./mqtt');

const { PORT, MQTT_PORT } = process.env;

api.listen(PORT, () => {
  console.log(`flinx HTTP API listening at port ${PORT}`);
});

server.listen(MQTT_PORT, () => {
  console.log(`flinx MQTT broker is listening at port ${MQTT_PORT}`);
});
