import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useCacheContext } from 'context/cache.context';

interface Props<T, P = unknown> {
    name: string;
    endpoint: (data: P) => Promise<AxiosResponse<T>>;
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
    refreshOnSuccess?: boolean;
}

export const useAction = <T, P = unknown>({
    name,
    endpoint,
    onSuccess,
    onError,
    refreshOnSuccess = true,
}: Props<T, P>) => {
    const { refreshQuerys } = useCacheContext();

    const { mutate, isPending, isError, error, data, isSuccess } = useMutation({
        mutationKey: [name],
        mutationFn: (data: P) => endpoint(data),
        onSuccess: (data: AxiosResponse<T>) => {
            onSuccess && onSuccess(data.data);
            refreshOnSuccess && refreshQuerys();
        },
        onError: (error: AxiosError) => {
            onError && onError(error);
        },
    });

    return {
        mutate,
        isLoading: isPending,
        isError,
        error: error as AxiosError,
        data: data?.data,
        isSuccess,
    };
};
