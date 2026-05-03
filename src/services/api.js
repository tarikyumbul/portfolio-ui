import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioApi = {
  getFullPortfolio: () => apiClient.get('/portfolio').then(r => r.data),
  getProfile:       () => apiClient.get('/profile').then(r => r.data),
  getExperiences:   () => apiClient.get('/experiences').then(r => r.data),
  getEducations:    () => apiClient.get('/educations').then(r => r.data),
  getSkills:        () => apiClient.get('/skills').then(r => r.data),
  getProjects:      () => apiClient.get('/projects').then(r => r.data),
  getCertifications:() => apiClient.get('/certifications').then(r => r.data),
};

export default apiClient;
