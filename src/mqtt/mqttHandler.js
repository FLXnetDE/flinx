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
  console.log(`[MQTT] [PUB] [${client.id}] [${packet.topic}] ${packet.payload}`);
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
