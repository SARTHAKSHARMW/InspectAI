import api from './api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/api/users/login', credentials);
    return response.data; // { message, token }
  },
  register: async (userData: any) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};
