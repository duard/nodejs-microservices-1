import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import logger from '../logger';

const createApiInstance = (baseURL: string): AxiosInstance => axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

function handleRequestError(error: AxiosError): void {
  if (error.response) {
    logger.error('Request failed with response data:', error.response.data);
  } else if (error.request) {
    logger.error('No response received from the server.', error);
  } else {
    logger.error('Error setting up the request:', error.message);
  }
}

async function executeRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  baseURL: string,
  data?: any
): Promise<T> {
  const api: AxiosInstance = createApiInstance(baseURL);

  try {
    const response: AxiosResponse<T> = await api[method](url, data);
    return response.data;
  } catch (error: any) {
    handleRequestError(error);
    throw error;
  }
}

export const axiosGet = <T>(url: string, baseURL: string): Promise<T> => executeRequest<T>('get', url, baseURL);
export const axiosPost = <T>(url: string, baseURL: string, data?: any): Promise<T> => executeRequest<T>('post', url, baseURL, data);
export const axiosPut = <T>(url: string, baseURL: string, data?: any): Promise<T> => executeRequest<T>('put', url, baseURL, data);
export const axiosDelete = <T>(url: string, baseURL: string): Promise<T> => executeRequest<T>('delete', url, baseURL);
