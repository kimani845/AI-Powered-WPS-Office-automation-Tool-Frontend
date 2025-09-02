import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { ProcessRequest, DocumentRequest } from '../types/api';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: string) => void
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      onSuccess?.(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'An unexpected error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateDocument = useCallback(async (
    request: DocumentRequest,
    onSuccess?: (result: string) => void,
    onError?: (error: string) => void
  ) => {
    return executeApiCall(
      () => {
        // Route to specific endpoints based on document type
        switch (request.doc_type) {
          case 'cover_letter':
            return apiService.createCoverLetter(request);
          case 'minutes':
            return apiService.createMinutes(request);
          case 'memo':
            return apiService.createMemo(request);
          default:
            return apiService.generateDocument(request);
        }
      },
      (result) => onSuccess?.(result.result),
      onError
    );
  }, [executeApiCall]);

  const processCommand = useCallback(async (
    prompt: string,
    content: string = '',
    onSuccess?: (result: string) => void,
    onError?: (error: string) => void
  ) => {
    const request: ProcessRequest = { prompt, content };
    
    return executeApiCall(
      () => {
        // Determine the appropriate endpoint based on the prompt
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('report') || lowerPrompt.includes('business')) {
          return apiService.createReport(request);
        } else if (lowerPrompt.includes('analyze') && content) {
          return apiService.analyzeContent(request);
        } else if (lowerPrompt.includes('summarize') && content) {
          return apiService.summarizeContent(request);
        } else {
          return apiService.processGeneral(request);
        }
      },
      (result) => onSuccess?.(result.result),
      onError
    );
  }, [executeApiCall]);

  const checkServerHealth = useCallback(async (
    onSuccess?: (result: { message: string }) => void,
    onError?: (error: string) => void
  ) => {
    return executeApiCall(
      () => apiService.checkHealth(),
      onSuccess,
      onError
    );
  }, [executeApiCall]);

  return {
    isLoading,
    error,
    generateDocument,
    processCommand,
    checkServerHealth,
    clearError: () => setError(null),
  };
};