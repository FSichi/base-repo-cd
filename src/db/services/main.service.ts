import { AxiosResponse } from 'axios';
import { AppDataInstance } from 'db/api/axiosInstance';
import { FetchParams, FetchResponse, GetResponse } from 'db/interfaces/Main';
import { createFormattedURL } from 'utils/helpers/api.helpers';

export class ApiFactory {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>({
        method = 'get',
        endpoint,
        param,
        data,
    }: FetchParams): FetchResponse<T> {
        const url = createFormattedURL(this.baseURL, endpoint, param);
        const response: AxiosResponse<GetResponse<T>> = await AppDataInstance[method](url, data);
        return response;
    }

    async get<T>(endpoint: string, param?: string): FetchResponse<T> {
        return this.request<T>({ method: 'get', endpoint, param });
    }

    async post<T>(endpoint: string, data: any): FetchResponse<T> {
        return this.request<T>({ method: 'post', endpoint, data });
    }

    async put<T>(endpoint: string, data: T, param?: string): FetchResponse<T> {
        return this.request<T>({ method: 'put', endpoint, data, param });
    }

    async patch<T>(endpoint: string, data?: T, param?: string): FetchResponse<T> {
        return this.request<T>({ method: 'patch', endpoint, data, param });
    }

    async delete<T>(endpoint: string, param?: string): FetchResponse<T> {
        return this.request<T>({ method: 'delete', endpoint, param });
    }
}
