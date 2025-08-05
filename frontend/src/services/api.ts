import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});
api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0ZS0xMjMiLCJpYXQiOjE3NTQzNTQyMjIsImV4cCI6MTc1NDM1NzgyMn0.UYedpR6pQuB5Unmb1hU6nKbjVDTTB298yIA1fWPhwTY
`; 
  return config;
});

export default api;
