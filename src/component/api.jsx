import axios from 'axios';
import io from 'socket.io-client';

const baseURL = 'http://localhost:8000';
const socket = io(baseURL); // Create a Socket.IO client instance

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.getSocket = () => {
  return socket;
};

export default api;
