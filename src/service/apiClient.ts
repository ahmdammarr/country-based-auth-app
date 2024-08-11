import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoreKeys} from '@/constants/storeKeys';
import i18n from '@/config/i18n';
import {getCredentials} from '@/config/secureStore';
import {Errors} from '@/types/error.type';

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: Errors;
}

const getCountry = async () => {
  const country = await AsyncStorage.getItem(StoreKeys.COUNTRY);

  return country;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<AxiosHeaders>) => {
    const token = await getCredentials();
    const country = await getCountry();
    const prefferedlang = i18n.language.split('-')[0];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.country = country;
    config.headers.prefferedlang = prefferedlang;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    let apiError: ApiError = {
      message: Errors.SERVER_ERROR,
    };

    if (error.response) {
      apiError = {
        message: error.response.data.message || 'API Error',
        status: error.response.status,
        details: error.response.data,
      };
    } else if (error.request) {
      apiError = {
        message: Errors.SERVER_ERROR,
      };
    } else {
      apiError = {
        message: error.message,
      };
    }

    return Promise.reject(apiError);
  },
);

export const Get = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: ApiResponse<T> = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    throw error as ApiError;
  }
};

export const Post = async <T, R>(
  endpoint: string,
  data: T,
): Promise<ApiResponse<R>> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    throw error as ApiError;
  }
};

export default apiClient;
