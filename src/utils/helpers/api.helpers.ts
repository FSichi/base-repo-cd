import { QueryClient } from '@tanstack/react-query';
import { clearCredentialsLocalStorage } from './credentials.helper';
import { RoutesListPaths } from 'routes';

export const STALE_TIME = 1000 * 60 * 1; // 1 minute
export const GC_TIME = 1000 * 60 * 2; // 2 minutes

export const getQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // default: true
                staleTime: STALE_TIME,
                gcTime: GC_TIME,
            },
        },
    });

export const createFormattedURL = (
    MS_URL: string,
    endpointURL: string,
    params: string | undefined,
) => {
    if (!params && endpointURL === '') return `${MS_URL}`;

    if (!params) {
        if (MS_URL === '') return `${endpointURL}`;
        return `${MS_URL}/${endpointURL}`;
    }
    if (endpointURL === '') return `${MS_URL}?${params}`;
    return `${MS_URL}/${endpointURL}?${params}`;
};

export const removeAuth = () => {
    clearCredentialsLocalStorage();
    window.location.replace(RoutesListPaths.LOGIN);
};
