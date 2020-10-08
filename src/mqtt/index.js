const aedes = require('aedes')();
const net = require('net');
const deviceService = require('../service/device.service');
const channelService = require('../service/channel.service');

const server = net.createServer(aedes.handle);
const mqttHandler = require('./mqttHandler');

aedes.authenticate = deviceService.authenticateClient;
aedes.authorizePublish = channelService.authorizePublish;
aedes.authorizeSubscribe = channelService.authorizeSubscribe;

aedes.on('client', mqttHandler.handleConnect);
aedes.on('clientDisconnect', mqttHandler.handleDisconnect);
aedes.on('publish', mqttHandler.handlePublish);
aedes.on('subscribe', mqttHandler.handleSubscribe);

module.exports = {
  server,
  aedes,
};
