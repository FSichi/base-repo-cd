import { ReactNode } from 'react';
import { BrowserRouter as RRDProvider } from 'react-router-dom';
import { MainRoutes } from 'routes';
import { AuthProvider, DrawerProvider, PaginationProvider } from 'context';
import { QueryProvider } from 'QueryProvider';
import { Toaster } from 'react-hot-toast';
import { HeroUIProvider } from '@heroui/system';

export const ChargeProviders = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <PaginationProvider>
                <QueryProvider>
                    <DrawerProvider>
                        <RRDProvider>
                            <HeroUIProvider>{children}</HeroUIProvider>
                        </RRDProvider>
                    </DrawerProvider>
                </QueryProvider>
            </PaginationProvider>
        </AuthProvider>
    );
};

export const App = () => {
    return (
        <ChargeProviders>
            <Toaster position='bottom-right' reverseOrder={false} />
            <MainRoutes />
        </ChargeProviders>
    );
};
