import axios from 'axios';
import { ProcessRequest, DocumentRequest, GeneralResponse, TranslationRequest } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Check server health
  checkHealth: async (): Promise<{ message: string }> => {
    const response = await apiClient.get('/');
    return response.data;
  },

  // General document generation
  generateDocument: async (request: DocumentRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/generate_document', request);
    return response.data;
  },

  // Dedicated document endpoints
  createCoverLetter: async (request: DocumentRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/create_cover_letter', request);
    return response.data;
  },

  createMinutes: async (request: DocumentRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/create_minutes', request);
    return response.data;
  },

  createMemo: async (request: DocumentRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/create_memo', request);
    return response.data;
  },

  createReport: async (request: ProcessRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/create_report', request);
    return response.data;
  },

  // Analysis and summarization
  analyzeContent: async (request: ProcessRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/analyze', request);
    return response.data;
  },

  summarizeContent: async (request: ProcessRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/summarize', request);
    return response.data;
  },

  // General processing
  processGeneral: async (request: ProcessRequest): Promise<GeneralResponse> => {
    const response = await apiClient.post('/process', request);
    return response.data;
  },
};