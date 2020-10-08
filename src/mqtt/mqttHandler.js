const randomstring = require('randomstring');
const deviceService = require('../service/device.service');
const channelService = require('../service/channel.service');

// Handle connection of a new MQTT client
function handleConnect(client) {
  console.log(`[MQTT] Client connected: ${client.id}`);
}

// Handle disconnect of a MQTT client
function handleDisconnect(client) {
  console.log(`[MQTT] Client disconnected: ${client.id}`);
}

// Handle a published message
async function handlePublish(packet, client) {
  if (packet.topic.endsWith('/new/clients') || packet.topic.endsWith('/heartbeat')) return; // Exclude new connection and heartbeat packets

  try {
    // Internal publish
    if (!client) {
      const data = {
        _id: randomstring.generate(8),
        payload: packet.payload,
        dateReceived: Date.now(),
      };
      await channelService.addData(packet.topic, data);
      return;
    }

    // Regular device publish
    console.log(`[MQTT] [PUB] [${client.id}] [${packet.topic}] ${packet.payload}`);

    const device = await deviceService.getDeviceByDeviceId(client.id);

    if (device) {
      const data = {
        _id: randomstring.generate(8),
        // eslint-disable-next-line no-underscore-dangle
        device: device._id,
        payload: packet.payload,
        dateReceived: Date.now(),
      };
      await channelService.addData(packet.topic, data);
    }
  } catch (err) {
    console.log(err);
  }
}

// Handle a topic subscription
function handleSubscribe(subscriptions, client) {
  console.log(`[MQTT] [SUB] [${client.id}] ${JSON.stringify(subscriptions)}`);
}

module.exports = {
  handleConnect,
  handleDisconnect,
  handlePublish,
  handleSubscribe,
};
