/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, ReactNode, SetStateAction } from 'react';

interface IntialState {
    dataLength: number;
    updateDataLength: (newLength: number) => void;
}

interface PaginationProviderProps {
    children: ReactNode;
}

export const PaginationContext = createContext({} as IntialState);

const PaginationProvider = ({ children }: PaginationProviderProps) => {
    const [dataLength, setDataLength] = useState(0);

    const updateDataLength = (newLength: SetStateAction<number>) => {
        setDataLength(newLength);
    };

    const memoedValue = React.useMemo(() => {
        const value = {
            dataLength,
            updateDataLength,
        };
        return value;
    }, [dataLength]);

    return <PaginationContext.Provider value={memoedValue}>{children}</PaginationContext.Provider>;
};

export default PaginationProvider;
