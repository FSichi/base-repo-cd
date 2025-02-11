import { ApiFactory } from 'db/services/main.service';
import { AUTH_BASE_URL } from 'db/api/apiConstants';
import {
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
} from 'db/interfaces/Authorization';

const authApi = new ApiFactory(AUTH_BASE_URL);

export default {
    getLogin: (body: LoginRequest) => authApi.post<LoginResponse>('login', body),
    getLogout: (body: LogoutRequest) => authApi.post<LogoutResponse>('logout', body),
};
