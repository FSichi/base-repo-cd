import { useEffect, useState, useCallback, useMemo } from 'react';
import { FilterConfig, SetFilterValueType } from 'utils/interfaces/filters.types';
import { setFilterQuery, updatePaginationQuery } from 'utils/helpers/filter.helper';

interface Props {
    page: number;
    pageSize?: number;
    setPage: (page: number) => void;
}

export const useQueryDBParams = ({ page, pageSize = 10, setPage }: Props) => {
    const initialQueryStringFilters = useMemo(
        () => `page=${page}&pageSize=${pageSize}`,
        [page, pageSize],
    );
    const [queryFilter, setQueryFilter] = useState<string>(initialQueryStringFilters);

    const handleSetFilter = useCallback((filter: FilterConfig, value: SetFilterValueType) => {
        // if (filter.key !== 'searchText' && filter.key !== 'areaId' && (!filter || !value)) return;
        setQueryFilter(prevQueryFilters => {
            const newQueryFilters = setFilterQuery(prevQueryFilters, filter, value);
            return updatePaginationQuery(newQueryFilters, page, pageSize);
        });
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQueryFilter(prevQueryFilters => updatePaginationQuery(prevQueryFilters, page, pageSize));
    }, [page, pageSize]);

    return {
        queryFilter,
        handleSetFilter,
    };
};
