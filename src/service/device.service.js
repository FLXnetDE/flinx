const { v4: uuid } = require('uuid');
const Device = require('../database/schema/device.schema');

// Get all devices by userId
async function getDevices(userId) {
  const devices = await Device.find({ userId });
  return devices;
}

// Get one device by it´s ObjectId and a given userId
async function getDevice(id, userId) {
  const device = await Device.findOne({ _id: id, userId });
  return device;
}

// Create a new device with a given HTTP body and a users id
async function createDevice(body, userId) {
  const device = new Device(body);
  device.deviceKey = uuid();
  device.deviceSecret = uuid();
  device.userId = userId;
  const newDevice = await device.save();
  return newDevice;
}

// Delete a device by a given id
async function deleteDevice(id, userId) {
  const deleted = await Device.deleteOne({ _id: id, userId });
  return deleted;
}

module.exports = {
  getDevices,
  getDevice,
  createDevice,
  deleteDevice,
};