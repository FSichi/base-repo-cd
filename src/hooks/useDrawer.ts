import { DrawerContext } from 'context/drawer.context';
import { useContext } from 'react';

export const useDrawer = () => {
    const { drawer, setDrawer } = useContext(DrawerContext);

    const OpenDrawer = () => {
        setTimeout(() => {
            setDrawer(true);
        }, 200);
    };

    const CloseDrawer = () => setDrawer(false);

    return { drawer, OpenDrawer, CloseDrawer };
};
