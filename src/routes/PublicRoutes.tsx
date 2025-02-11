import { ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PublicRoutesList } from './RoutesList';

import { PublicPageLayout as PageLayout } from 'components/Layouts/PageLayout';
import { Spinner } from 'components/Spinner';

export const PublicRoutes = () => {
    return (
        <section className='min-h-screen flex flex-col'>
            <section className='flex-1 flex'>
                <PageLayout customClassName='w-full'>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            {PublicRoutesList.map(({ Component, path }, i) => (
                                <Route key={i} path={path} element={Component as ReactNode} />
                            ))}
                        </Routes>
                    </Suspense>
                </PageLayout>
            </section>
        </section>
    );
};
