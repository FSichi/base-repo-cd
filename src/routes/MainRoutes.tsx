import { useMemo } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { useAuthContext } from 'context/auth.context';
import { Spinner } from 'components/Spinner';

export const MainRoutes = () => {
    const { credentials, areCredentialsVerified } = useAuthContext();

    const isAuth = useMemo(() => {
        return !!credentials && areCredentialsVerified;
    }, [credentials, areCredentialsVerified]);

    if (!areCredentialsVerified) return <Spinner />;

    return isAuth ? <PrivateRoutes /> : <PublicRoutes />;
};
