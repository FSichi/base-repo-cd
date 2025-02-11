import { useState, useMemo } from 'react';
import { SortDirection } from 'utils/interfaces/Table.types';

// Función para obtener valores anidados utilizando notación de puntos
const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
};

interface TableSortConfig<T> {
    data: T[];
    initialSortColumn?: keyof T | string;
    initialSortDirection?: SortDirection;
}

export function useTableSort<T>({
    data,
    initialSortColumn,
    initialSortDirection = 'asc',
}: TableSortConfig<T>) {
    const [sortColumn, setSortColumn] = useState<keyof T | string | null>(
        initialSortColumn ? (initialSortColumn as keyof T | string) : null,
    );
    const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

    const compareValues = (a: any, b: any) => {
        if (a === b) return 0;

        if (a === null || a === undefined) return sortDirection === 'asc' ? -1 : 1;
        if (b === null || b === undefined) return sortDirection === 'asc' ? 1 : -1;

        if (a instanceof Date && b instanceof Date) {
            return a.getTime() - b.getTime();
        }

        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }

        return a < b ? -1 : 1;
    };

    const handleSort = (columnKey: string | keyof T) => {
        if (sortColumn === columnKey) {
            setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const sortedData = useMemo(() => {
        if (!sortColumn) return data;

        return [...data].sort((a, b) => {
            const valueA = getNestedValue(a, sortColumn as string);
            const valueB = getNestedValue(b, sortColumn as string);
            const comparisonResult = compareValues(valueA, valueB);

            return sortDirection === 'asc' ? comparisonResult : -comparisonResult;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, sortColumn, sortDirection]);

    return { sortedData, handleSort, sortColumn, sortDirection };
}
