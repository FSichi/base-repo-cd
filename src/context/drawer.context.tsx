import { createContext, useState, ReactNode, SetStateAction, useMemo } from 'react';

interface IntialState {
    drawer: boolean;
    setDrawer: (value: boolean) => void;
    showTabs: boolean;
    updateShowTabs: (value: boolean) => void;
}

interface DrawerProviderProps {
    children: ReactNode;
}

const DrawerContext = createContext({} as IntialState);

const PaginationProvider = ({ children }: DrawerProviderProps) => {
    const [drawer, setDrawer] = useState(false);
    const [showTabs, setShowTabs] = useState(true);

    const updateShowTabs = (newValue: SetStateAction<boolean>) => {
        setShowTabs(newValue);
    };

    const memoedValue = useMemo(() => {
        const value = {
            drawer,
            setDrawer,
            showTabs,
            updateShowTabs,
        };
        return value;
    }, [drawer, showTabs]);

    return <DrawerContext.Provider value={memoedValue}>{children}</DrawerContext.Provider>;
};

export default PaginationProvider;
