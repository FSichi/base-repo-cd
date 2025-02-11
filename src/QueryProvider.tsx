import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CacheProvider } from 'context';
import { ReactNode, useMemo } from 'react';
import { getQueryClient } from 'utils/helpers/api.helpers';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useMemo(() => getQueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            <CacheProvider queryClient={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </CacheProvider>
        </QueryClientProvider>
    );
};
