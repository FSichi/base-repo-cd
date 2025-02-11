/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSidebarRoutesForRole, RoutesListPaths } from 'routes';
import { Sidebar } from './Sidebar';
import { animate, useMotionValue } from 'framer-motion';
import { TranslationsKeys } from 'utils/i18n';
import { useAuthContext } from 'context/auth.context';

export interface Props {}

export const SidebarContainer = (props: Props) => {
    const { t } = useTranslation(TranslationsKeys.COMMON);
    const navigate = useNavigate();

    const { credentials } = useAuthContext();

    const y = useMotionValue(0);

    const sidebarRoutesFiltered = useMemo(
        () => getSidebarRoutesForRole(['ADMIN']),
        [credentials?.user.roles],
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [routes, setRoutes] = useState(sidebarRoutesFiltered);

    const onMenuClick = (index: number, url: RoutesListPaths) => {
        setSelectedIndex(index);
        navigate(url);
    };

    useEffect(() => {
        const newRoutes = sidebarRoutesFiltered.map((route, index) => {
            if (
                route.path.startsWith('/config') &&
                window.location.pathname.startsWith(route.path)
            ) {
                setSelectedIndex(index);
                return { ...route, active: true };
            }

            if (
                !route.path.startsWith('/config') &&
                window.location.pathname.split('/')[1].startsWith(route.path.split('/')[1])
            ) {
                setSelectedIndex(index);
                return { ...route, active: true };
            }

            return { ...route, active: false };
        });

        setRoutes(newRoutes);
    }, [navigate]);

    useEffect(() => {
        // const positions = [60, 60, 60, 60, 60, 73.7, 71.3, 69.7, 68.5, 67.6];
        const positions = [60, 60, 60, 60, 60, 73.6, 71.3, 69.7, 68.5, 67.6];
        const newPosition =
            selectedIndex < positions.length
                ? selectedIndex * positions[selectedIndex]
                : selectedIndex * 60;
        animate(y, newPosition, { type: 'spring', stiffness: 300, damping: 30 });
    }, [selectedIndex]);

    const childProps = {
        ...props,
        t,
        y,
        routes,
        onMenuClick,
        selectedIndex,
    };

    return <Sidebar {...childProps} />;
};
