/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { QueryClient } from '@tanstack/react-query';
import { ICredentials } from 'db/interfaces/Authorization';
import { ReactNode, createContext, useCallback, useContext, useEffect } from 'react';
import { useAuthContext } from './auth.context';
import { DISABLED_REFETCH } from 'db/api/apiConstants';

interface IntialState {
    credentials?: ICredentials;
    refreshQuerys: () => void;
    invalidateQueries: (queries: string[]) => void;
    removeQueries: (queries: string[]) => void;
    clearCache: () => void;
}

interface CacheProviderProps {
    queryClient: QueryClient;
    children: ReactNode;
}

const initialContext: IntialState = {
    refreshQuerys: () => {},
    invalidateQueries: () => {},
    removeQueries: () => {},
    clearCache: () => {},
};

export const CacheContext = createContext<IntialState>(initialContext);

const CacheProvider = ({ children, queryClient }: CacheProviderProps) => {
    const { credentials } = useAuthContext();

    const refreshQuerys = useCallback(() => {
        queryClient
            .getQueryCache()
            .getAll()
            .forEach(query => {
                if (
                    query.options.queryKey &&
                    !DISABLED_REFETCH.includes(query.options.queryKey[0] as string)
                ) {
                    queryClient.removeQueries({ queryKey: query.options.queryKey });
                }
            });
    }, [queryClient]);

    const invalidateQueries = (queries: string[]) => {
        queries.forEach(query => {
            if (!DISABLED_REFETCH.includes(query)) {
                queryClient.invalidateQueries({ queryKey: [query] });
            }
        });
    };

    const removeQueries = (queries: string[]) =>
        queries.forEach(query => {
            if (!DISABLED_REFETCH.includes(query)) {
                queryClient.removeQueries({ queryKey: [query] });
            }
        });

    const clearCache = () => queryClient.clear();

    useEffect(() => {
        if (credentials?.company?.id) refreshQuerys();
    }, [credentials?.company?.id]);

    return (
        <CacheContext.Provider
            value={{
                credentials,
                refreshQuerys,
                removeQueries,
                invalidateQueries,
                clearCache,
            }}>
            {children}
        </CacheContext.Provider>
    );
};

export default CacheProvider;

export const useCacheContext = () => {
    const context = useContext(CacheContext);
    if (context === undefined) {
        throw new Error('useCacheContext must be used within a LoginProvider');
    }
    return context;
};
