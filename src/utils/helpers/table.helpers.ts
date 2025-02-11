import { CSSProperties } from 'react';
import { Tab } from 'utils/interfaces/general.types';
import {
    TableHeaderData,
    TableHeaderFormatted,
    TooltipConfig,
    VisibleColumns,
} from 'utils/interfaces/Table.types';

export const getTableHeaders = (
    headers: TableHeaderData[],
    tooltipConfigs: TooltipConfig[],
    visibleColumns?: VisibleColumns,
): TableHeaderFormatted[] => {
    return headers.map(({ title, width, key, sort }) => {
        const tooltipConfig = tooltipConfigs.find(config => config.tooltipKey === key);
        const visible = visibleColumns ? visibleColumns[key!] : undefined;

        return {
            title,
            key: key || '',
            sort: sort || false,
            width,
            visible,
            tooltip: !!tooltipConfig,
            tooltipContent: tooltipConfig ? tooltipConfig.tooltipContent : undefined,
        };
    });
};

export const getColumnsForDynamicTable = (
    visibleColumns: VisibleColumns,
    columns: { key: string; name: string }[],
) => {
    const mappedValues = Object.entries(visibleColumns).map(([key, value]) => {
        return { key, value };
    });

    return columns.map(column => {
        return {
            name: column.name,
            key: column.key,
            visible: mappedValues.find(mappedValue => mappedValue.key === column.key)!.value,
        };
    });
};

export const getColumnWidth = (width: string): CSSProperties => {
    const widthNumber = Number(width.replace('px', '').replace('w-[', '').replace(']', ''));
    return { minWidth: widthNumber, maxWidth: widthNumber };
};

export const getTabsPosition = (tabs: Tab[], index: number): number => {
    let subWidth = 0;
    for (let i = 0; i < index; i++) {
        i === index ? (subWidth += tabs[i].width!) : (subWidth += tabs[i].width! + 24);
    }
    return subWidth;
};

export const getButtonPosition = (tabs: Tab[], index: number): number => {
    let subWidth = 0;
    for (let i = 0; i < index; i++) {
        subWidth += tabs[i].width!;
    }
    return subWidth;
};
