import { AxiosResponse } from 'axios';

export interface GetResponse<T> {
    page?: number;
    pageSize?: number;
    total?: number;
    data: T;
}

export type FetchResponse<T> = Promise<AxiosResponse<GetResponse<T>>>;

export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface BaseFetchParams {
    endpoint: string;
    param?: string;
}

export interface FetchParams extends BaseFetchParams {
    method: MethodType;
    data?: any;
}

export type QueueMethods = Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}>;
