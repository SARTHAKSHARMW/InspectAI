import api from './api';

export const inspectionService = {
  createInspection: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/api/inspections', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  getUserInspections: async () => {
    const response = await api.get('/api/inspections');
    return response.data;
  },
  
  getInspection: async (id: string | number) => {
    const response = await api.get(`/api/inspections/${id}`);
    return response.data;
  }
};
