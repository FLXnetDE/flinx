const aedes = require('aedes')();
const net = require('net');

const server = net.createServer(aedes.handle);
const mqttAuthenticationHandler = require('./mqttAuthenticationHandler');
const mqttHandler = require('./mqttHandler');

aedes.authenticate = mqttAuthenticationHandler.authenticateClient;
aedes.authorizePublish = mqttAuthenticationHandler.authorizePublish;
aedes.authorizeSubscribe = mqttAuthenticationHandler.authorizeSubscribe;

aedes.on('client', mqttHandler.handleConnect);
aedes.on('clientDisconnect', mqttHandler.handleDisconnect);
aedes.on('publish', mqttHandler.handlePublish);
aedes.on('subscribe', mqttHandler.handleSubscribe);

module.exports = {
  server,
  aedes,
};
