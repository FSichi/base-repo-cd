/* eslint-disable react-refresh/only-export-components */
import { TokenManager } from 'db/api/TokenManager';
import { ICredentials } from 'db/interfaces/Authorization';
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { getCredentialsLocalStorage } from 'utils/helpers/credentials.helper';
import { UserRoleEnum } from 'utils/interfaces/routes.types';

interface IAuthContext {
    isSuperAdmin: boolean;
    credentials?: ICredentials;
    setCredentials: Dispatch<SetStateAction<ICredentials | undefined>>;
    areCredentialsVerified: boolean;
    checkIfCredentialsExists: () => boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const initialContext: IAuthContext = {
    isSuperAdmin: false,
    setCredentials: () => {},
    areCredentialsVerified: false, // Estado inicial: las credenciales no están verificadas
    checkIfCredentialsExists: () => false,
};

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const tokenManager = TokenManager.getInstance();

    const [credentials, setCredentials] = useState<ICredentials | undefined>(undefined);
    const isSuperAdmin = credentials?.role === UserRoleEnum.SUPERADMIN;
    const [areCredentialsVerified, setAreCredentialsVerified] = useState<boolean>(false);

    useEffect(() => {
        const credentials = getCredentialsLocalStorage();

        if (credentials) {
            setCredentials(credentials);
            tokenManager.setTokens({
                accessToken: credentials.auth.access_token,
                refreshToken: credentials.auth.refresh_token,
            });
        }

        setAreCredentialsVerified(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIfCredentialsExists = () => {
        const credentials = getCredentialsLocalStorage();
        return !!credentials;
    };

    return (
        <AuthContext.Provider
            value={{
                credentials,
                setCredentials,
                areCredentialsVerified,
                checkIfCredentialsExists,
                isSuperAdmin,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a LoginProvider');
    }
    return context;
};
