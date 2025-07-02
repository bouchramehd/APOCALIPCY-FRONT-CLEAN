import axios from 'axios';

export const uploadPDF = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post('/api/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post('/api/auth/login', { email, password });
  return res.data;
};

export const register = async (username: string, email: string, password: string) => {
  const res = await axios.post('/api/auth/register', { username, email, password });
  return res.data;
};
