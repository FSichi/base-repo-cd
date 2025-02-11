import { useEffect, useRef, useState } from 'react';
import { debounce } from 'utils/helpers/filter.helper';
import { FilterType } from 'utils/interfaces/filters.types';
import { SelectOptionType } from 'utils/interfaces/general.types';

interface Props {
    initialValue: SetFilterValueType;
    updateFilter: (value?: SetFilterValueType) => void;
    filterType: FilterType;
}

type SetFilterValueType = string | SelectOptionType;

export const useFilterValue = ({ initialValue, updateFilter, filterType }: Props) => {
    const [filterValue, setFilterValue] = useState(initialValue);
    const debouncedSetFilter = useRef(debounce(updateFilter, 600)).current;

    useEffect(() => {
        filterType === 'text' ? debouncedSetFilter(filterValue) : updateFilter(filterValue || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValue]);

    return { filterValue, setFilterValue };
};
