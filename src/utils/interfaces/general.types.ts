import { TFunction } from 'i18next';
import { ChangeEvent, FC, SVGProps } from 'react';
import { MultiValue, SingleValue } from 'react-select';
// import { UserRole } from './routes.types';

export type TLanguagesOptions = {
    [key: string]: string;
};

export type ITranslate = TFunction<any, undefined>;

export const languages: TLanguagesOptions = {
    en: 'en-US',
    es: 'es-ES',
};

export interface IObject {
    [key: string]: any;
}

export interface Tab {
    label: string;
    value: string | number;
    width?: number;
}

export interface SelectOption {
    label: string;
    value: string | number | boolean;
}

export type SelectOptionType = SelectOption | undefined | null;
export type SelectInputValueType = SingleValue<SelectOptionType> | MultiValue<SelectOptionType>;

export type InputHTMLEvent = ChangeEvent<HTMLInputElement>;

export interface FormsValidator {
    status: boolean;
    error: string;
}

export type IconSVGComponent = FC<SVGProps<SVGSVGElement>>;

export interface ModalControls {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
}

export type TooltipPlacement =
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
