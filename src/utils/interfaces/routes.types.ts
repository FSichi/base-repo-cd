import { JSX, LazyExoticComponent, ReactNode } from 'react';
import { RoutesListPaths } from 'routes';
import { SelectOption } from './general.types';

type RouteComponent = JSX.Element | ReactNode | LazyExoticComponent<() => JSX.Element>;
type IconSidebarComponent = any;

export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'PUBLIC';

export enum UserRoleEnum {
    PUBLIC = 'PUBLIC',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

export interface AppRoutesInterface {
    path: string;
    Component: RouteComponent;
    roles: UserRole[];
}

export interface ISidebarRoutes {
    title: string;
    path: RoutesListPaths;
    Icon: IconSidebarComponent;
    active: boolean;
    roles: UserRole[];
}

export interface CrossParams {
    from: string;
    filters: {
        area: SelectOption;
        isPending: SelectOption;
    };
}
