// Configuration de l'API
export const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000';

// Configuration axios
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 180000,
  headers: {
    'Content-Type': 'application/json',
  },
}; 