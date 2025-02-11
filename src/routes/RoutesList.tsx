import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutesInterface, ISidebarRoutes, UserRoleEnum } from 'utils/interfaces/routes.types';

import { MenuChatIcon, MenuDashboardIcon } from 'assets/icons';
import { generalItemTranslation } from 'utils/helpers/general.helpers';
import { TranslationsKeys } from 'utils/i18n';

const LoginPage = lazy(() => import('pages/Public/LoginPage'));
const Error404 = lazy(() => import('components/Layouts/NotFound/Error404'));
const HomePage = lazy(() => import('pages/Private/HomePage'));
const TestPage = lazy(() => import('pages/Private/TestPage'));

export enum RoutesListPaths {
    ANY = '*',
    ROOT = '/',
    NOT_FOUND = '/404',
    LOGIN = '/login',
    HOME = '/home',
    TEST = '/test',
}

export const PublicRoutesList: AppRoutesInterface[] = [
    {
        path: RoutesListPaths.ANY,
        roles: [UserRoleEnum.PUBLIC],
        Component: <Navigate to={RoutesListPaths.LOGIN} replace />,
    },
    {
        path: RoutesListPaths.ROOT,
        roles: [UserRoleEnum.PUBLIC],
        Component: <Navigate to={RoutesListPaths.LOGIN} replace />,
    },
    {
        path: RoutesListPaths.NOT_FOUND,
        roles: [UserRoleEnum.PUBLIC],
        Component: <Error404 />,
    },
    {
        path: RoutesListPaths.LOGIN,
        roles: [UserRoleEnum.PUBLIC],
        Component: <LoginPage />,
    },
];

export const PrivateRoutesList: AppRoutesInterface[] = [
    {
        path: RoutesListPaths.ANY,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <Navigate to={RoutesListPaths.NOT_FOUND} replace />,
    },
    {
        path: RoutesListPaths.LOGIN,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <Navigate to={RoutesListPaths.HOME} replace />,
    },
    {
        path: RoutesListPaths.ROOT,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <Navigate to={RoutesListPaths.HOME} replace />,
    },
    {
        path: RoutesListPaths.NOT_FOUND,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <Error404 />,
    },
    {
        path: RoutesListPaths.HOME,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <HomePage />,
    },
    {
        path: RoutesListPaths.TEST,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
        Component: <TestPage />,
    },
];

export const SidebarRoutes: ISidebarRoutes[] = [
    {
        title: generalItemTranslation('sidebar_route_home', TranslationsKeys.COMMON),
        path: RoutesListPaths.HOME,
        Icon: MenuDashboardIcon,
        active: false,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
    },
    {
        title: generalItemTranslation('sidebar_route_test', TranslationsKeys.COMMON),
        path: RoutesListPaths.TEST,
        Icon: MenuChatIcon,
        active: false,
        roles: [UserRoleEnum.SUPERADMIN, UserRoleEnum.ADMIN],
    },
];

export const getSidebarRoutesForRole = (userRoles: string[]): ISidebarRoutes[] =>
    SidebarRoutes.filter(route => route.roles.some(role => userRoles.includes(role)));
