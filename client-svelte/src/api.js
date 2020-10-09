import axios from 'axios';

const API_URL = 'http://localhost:4000';

// Get profile of the currently authenticated in user
export async function getProfile() {
  const response = await axios.get(`${API_URL}/api/v1/auth/me`);
  return response.data;
}

// Get all channels of the currently authenticated user
export async function getChannels() {
  const response = await axios.get(`${API_URL}/api/v1/channels`);
  return response.data;
}

// Get a spefici channel of the currently authenticated user
export async function getChannel(id) {
  const response = await axios.get(`${API_URL}/api/v1/channels/${id}`);
  return response.data;
}
