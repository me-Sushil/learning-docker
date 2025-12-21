// Automatically uses VITE_API_URL from .env in production
// Falls back to proxy in development
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/data`);
  return response.json();
};