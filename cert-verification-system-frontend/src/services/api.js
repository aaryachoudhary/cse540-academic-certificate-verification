// API Service for Backend Communication
import axios from 'axios';
import CONFIG from '../config/constants.js';

const api = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Certificate API endpoints
export const certificateAPI = {
  // Issue a new certificate
  issue: async (data) => {
    const response = await api.post('/certificates/issue', data);
    return response.data;
  },

  // Revoke a certificate
  revoke: async (certificateId) => {
    const response = await api.post('/certificates/revoke', { certificateId });
    return response.data;
  },

  // Get certificate by ID
  getById: async (id) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data.certificate;
  },

  // Check if certificate exists
  exists: async (id) => {
    const response = await api.get(`/certificates/exists/${id}`);
    return response.data.exists;
  },

  // Get certificates by issuer address
  getByIssuer: async (issuerAddress) => {
    const response = await api.get(`/certificates/issuer/${issuerAddress}`);
    return response.data.certificates;
  },

  // Get certificates by recipient address
  getByRecipient: async (recipientAddress) => {
    const response = await api.get(`/certificates/recipient/${recipientAddress}`);
    return response.data.certificates;
  },
};

export default certificateAPI;

