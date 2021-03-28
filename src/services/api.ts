import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:61942/api',
});

export default api;
