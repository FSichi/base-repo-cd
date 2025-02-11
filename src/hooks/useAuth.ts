import { useAuthContext } from 'context/auth.context';
import {
    clearCredentialsLocalStorage,
    setCredentialsLocalStorage,
} from 'utils/helpers/credentials.helper';
import { ICredentials } from 'db/interfaces/Authorization';
import { useAction } from './db/useAction';
import AuthorizationService from 'db/services/auth/authorization.service';
import toast from 'react-hot-toast';
import { RoutesListPaths } from 'routes';
import { useNavigate } from 'react-router-dom';
import { TokenManager } from 'db/api/TokenManager';
import { useCacheContext } from 'context/cache.context';

export const useAuth = () => {
    const tokenManager = TokenManager.getInstance();
    const navigate = useNavigate();
    const { credentials, setCredentials } = useAuthContext();
    const { clearCache } = useCacheContext();

    const { mutate } = useAction({
        name: 'Auth - Logout',
        endpoint: () => AuthorizationService.getLogout({ username: credentials?.user.email || '' }),
    });

    const logout = () => {
        mutate(null, {
            onSuccess: () => {
                navigate(RoutesListPaths.LOGIN, { replace: true });
                setCredentials(undefined);
                clearCredentialsLocalStorage();
                clearCache();
                tokenManager.clearTokens();
                toast.success('Sesión cerrada correctamente');
            },
        });
    };

    const saveCredentials = (obj: ICredentials) => {
        setCredentials(obj);
        setCredentialsLocalStorage(obj);
        tokenManager.setTokens({
            accessToken: obj.auth.access_token,
            refreshToken: obj.auth.refresh_token,
        });
    };

    return { credentials, logout, saveCredentials };
};
