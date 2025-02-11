import { ReactNode, useEffect, useCallback } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/auth.context';
import { RoutesListPaths, PrivateRoutesList } from './RoutesList';
import { Spinner } from 'components/Spinner';

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { credentials, areCredentialsVerified, checkIfCredentialsExists } = useAuthContext();

    const hasCredentials = checkIfCredentialsExists();

    const redirectToLogin = useCallback(() => {
        if (!hasCredentials) return navigate(RoutesListPaths.LOGIN, { replace: true });
    }, [hasCredentials, navigate]);

    const verifyAccess = useCallback(() => {
        const currentPath = location.pathname;
        const currentRoute = PrivateRoutesList.find(route => route.path === currentPath);

        if (currentRoute && !currentRoute.roles.includes(credentials?.role!))
            return navigate(RoutesListPaths.NOT_FOUND, { replace: true });
    }, [location.pathname, credentials, navigate]);

    useEffect(() => {
        redirectToLogin();
    }, [redirectToLogin]);

    useEffect(() => {
        if (hasCredentials) verifyAccess();
    }, [hasCredentials, verifyAccess]);

    if (!areCredentialsVerified) return <Spinner />;

    if (!credentials) return <Navigate to={RoutesListPaths.LOGIN} replace />;

    return children;
};
