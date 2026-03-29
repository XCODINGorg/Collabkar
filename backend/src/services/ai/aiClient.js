// AI INTEGRATION LAYER - new file
import axios from 'axios';

const aiClient = axios.create({
  baseURL: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  timeout: parseInt(process.env.AI_TIMEOUT_MS || '20000'),
  headers: { 'Content-Type': 'application/json' }
});

aiClient.interceptors.response.use(
  res => res,
  err => {
    console.error('[AI Service Error]', err.response?.status, err.message);
    return Promise.reject(err);
  }
);

export default aiClient;