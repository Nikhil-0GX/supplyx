import axios from 'axios';

// Get the API base URL from environment variables or use a default
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4943';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS and cookie handling
});

// Add a request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API errors consistently
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    throw new Error('Network error. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    throw new Error('An unexpected error occurred');
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchSuppliers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/suppliers?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default api; 