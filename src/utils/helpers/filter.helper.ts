import { FilterConfig, RangeDateValue, SetFilterValueType } from 'utils/interfaces/filters.types';

export const getUpdatedQueryParts = (prevQueryFilters: string, key: string, value: string) => {
    const queryParts = prevQueryFilters.split('&').filter(part => part);
    const filterIndex = queryParts.findIndex(part => part.startsWith(`${key}=`));

    if (value) {
        if (value === undefined) return queryParts;

        filterIndex >= 0
            ? (queryParts[filterIndex] = `${key}=${value}`)
            : queryParts.push(`${key}=${value}`);
    } else if (filterIndex >= 0) {
        queryParts.splice(filterIndex, 1);
    }

    return queryParts;
};

export const setFilterQuery = (
    prevQueryFilters: string,
    filter: FilterConfig,
    value: SetFilterValueType,
) => {
    let queryParts = prevQueryFilters.split('&').filter(part => part);

    if (filter.type === 'rangeDate' && typeof value === 'object' && value !== null) {
        const { start, end } = value as RangeDateValue;
        queryParts = getUpdatedQueryParts(queryParts.join('&'), `fechaDesde`, start);
        queryParts = getUpdatedQueryParts(queryParts.join('&'), `fechaHasta`, end);
    } else {
        let valueString = '';
        if (typeof value === 'boolean') {
            valueString = value ? 'true' : 'false';
        } else if (value) {
            valueString = value.toString();
        }

        queryParts = getUpdatedQueryParts(queryParts.join('&'), filter.key, valueString);
    }

    return queryParts.join('&');
};

export const updatePaginationQuery = (prevQueryFilters: string, page: number, pageSize: number) => {
    const newQuery = getUpdatedQueryParts(prevQueryFilters, 'page', page.toString()).join('&');
    return getUpdatedQueryParts(newQuery, 'pageSize', pageSize.toString()).join('&');
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
