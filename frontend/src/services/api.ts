import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function authHeader(token?: string) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default api;
