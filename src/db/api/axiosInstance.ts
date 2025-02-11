import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { V_BASE_URL } from 'utils/constants/envVarConstants';
import {
    AUTH_ERROR_CODES,
    PERMISSION_ERROR_CODES,
    REFRESH_EXPIRED,
    USER_NOT_CONFIRMED,
} from './apiConstants';
import { RoutesListPaths } from 'routes';
import { QueueMethods } from 'db/interfaces/Main';
import { refreshAccessToken } from './refreshToken';
import { removeAuth } from 'utils/helpers/api.helpers';
import { TokenManager } from './TokenManager';

const AXIOS_TIMEOUT = 30000;

let isRefreshing = false;
let failedQueue: QueueMethods = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const createAxiosInstance = (): AxiosInstance => {
    const tokenManager = TokenManager.getInstance();

    const instance = axios.create({
        baseURL: V_BASE_URL,
        // withCredentials: V_AXIOS_WITH_CREDENTIALS,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
        timeout: AXIOS_TIMEOUT,
    });

    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token = tokenManager.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            if (!response.data?.data) {
                response.data = { data: response.data };
            }
            return response;
        },
        async (error: AxiosError) => {
            if (error.response && PERMISSION_ERROR_CODES.includes(error.response.status)) {
                window.location.replace(RoutesListPaths.NOT_FOUND);
                return Promise.reject(error);
            }

            const originalRequest = error.config as InternalAxiosRequestConfig & {
                _retry?: boolean;
            };

            if (
                error.response?.status === 400 &&
                (error as any).response?.data?.title === USER_NOT_CONFIRMED
            ) {
                window.location.href = RoutesListPaths.LOGIN;
                return Promise.reject(error);
            }

            if (
                error.response?.status === 401 &&
                AUTH_ERROR_CODES.includes(error.response.status)
            ) {
                if (!originalRequest._retry) {
                    originalRequest._retry = true;

                    if (isRefreshing) {
                        // Agrega la petición a la cola si ya estamos refrescando el token
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then(token => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                return instance(originalRequest);
                            })
                            .catch(err => Promise.reject(err));
                    }

                    isRefreshing = true;

                    try {
                        const newToken = await refreshAccessToken();
                        processQueue(null, newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return instance(originalRequest);
                    } catch (refreshError) {
                        processQueue(refreshError as AxiosError, null);
                        if (
                            axios.isAxiosError(refreshError) &&
                            refreshError.response?.data?.title === REFRESH_EXPIRED
                        ) {
                            removeAuth();
                        }
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }
            }

            return Promise.reject(error);
        },
    );

    return instance;
};

export const AppDataInstance: AxiosInstance = createAxiosInstance();
