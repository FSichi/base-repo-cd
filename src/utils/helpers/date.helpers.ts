import { RangeDateValue } from 'utils/interfaces/filters.types';

export const getFormattedDate = (date: number | string): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const getRangeCalendarDate = (value: any): RangeDateValue | undefined => {
    if (!value) return undefined;
    return {
        start: value?.start,
        end: value?.end,
    };
};

export const formatDate = (date: string) => date.replace(/-/g, '/');

export const invertDate = (date: string | null) => {
    if (!date) return '';
    return date.split('-').reverse().join('/');
};

export const formatHour = (hour: string) => hour.slice(0, 5);
