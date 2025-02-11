/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCustomLocation = <T>() => {
    const location = useLocation();
    const { state } = location as { state: T };

    useEffect(() => {
        window.history.replaceState({}, '');
    }, [location.hash]);

    return { location, state };
};
