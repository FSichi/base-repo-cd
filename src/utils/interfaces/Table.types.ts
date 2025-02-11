import { ReactElement, ReactPortal } from 'react';

export interface RowData {
    data: string;
    style?: string;
    getStyle?: (data: any) => string;
}

/* DYNAMIC TABLE INTERFACES */

export interface TableHeaderData {
    title: string;
    width: string;
    sort?: boolean;
    key?: string;
}

export interface TableHeaderFormatted extends TableHeaderData {
    key: string;
    visible?: boolean;
    tooltip: boolean;
    tooltipContent?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface CommonTableData {
    cell: string | number;
    width: string;
}

export interface TooltipConfig {
    tooltipKey: string;
    tooltipContent: string;
}

export interface VisibleColumns {
    [key: string]: boolean;
}

export interface ColumnSelector {
    name: string;
    key: string;
    visible?: boolean;
}

export type CustomChildrenForTable = ReactElement | ReactPortal;
