import { ReactNode, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PrivateRoutesList } from './RoutesList';

import { PrivatePageLayout as PageLayout } from 'components/Layouts/PageLayout';
import { Footer } from 'components/Layouts/Footer';
import { Spinner } from 'components/Spinner';
import { Header } from 'components/Layouts/Header';
import { ProtectedRoute } from './ProtectedRoute';
import { Sidebar } from 'components/Layouts/Sidebar';
import { useAuthContext } from 'context/auth.context';

export const PrivateRoutes = () => {
    const location = useLocation();
    const { credentials } = useAuthContext();

    return (
        <section className='min-h-screen flex flex-col'>
            <Header />

            {credentials?.company?.id === undefined ? (
                <Spinner />
            ) : (
                <>
                    <section className='flex-1 flex'>
                        <Sidebar />

                        <PageLayout customClassName='w-full bg-[#F6F6F6] rounded-tl-[20px]'>
                            <Suspense fallback={<Spinner />}>
                                <Routes>
                                    {PrivateRoutesList.map(({ Component, path }, i) => (
                                        <Route
                                            key={i}
                                            path={path}
                                            element={
                                                <ProtectedRoute>
                                                    {Component as ReactNode}
                                                </ProtectedRoute>
                                            }
                                        />
                                    ))}
                                </Routes>
                            </Suspense>
                        </PageLayout>
                    </section>
                    {location.pathname !== '/404' && <Footer />}
                </>
            )}
        </section>
    );
};
