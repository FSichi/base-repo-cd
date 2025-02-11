import { UserRole } from 'utils/interfaces/routes.types';

export interface LSCredentials {
    token: string;
}

export interface ICredentials {
    auth: AuthenticationInfoApi;
    user: UserInfoApi;
    company: CompanyApi | null;
    role: UserRole;
}

/* API: [ /login ] */

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    auth: AuthenticationInfoApi;
    user: UserInfoApi;
    menus: Menus[];
    company: CompanyApi | null;
}

export interface RoleMiniItem {
    id: number;
    name: string;
    code: string;
}

interface Menus {
    name: string;
    code: string;
}

interface UserInfoApi {
    name: string;
    surname: string;
    email: string;
    roles: UserRole[];
}

interface AuthenticationInfoApi {
    access_token: string;
    expiration_date: number;
    id_token: string;
    refresh_token: string;
}

interface CompanyApi {
    id: number;
    name: string;
}

/* API: [ /logout ] */

export interface LogoutRequest {
    username: string;
}

export interface LogoutResponse {}
