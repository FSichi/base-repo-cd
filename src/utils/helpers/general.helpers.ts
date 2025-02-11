import i18n, { TranslationsKeys } from 'utils/i18n';
import { ISidebarRoutes } from 'utils/interfaces/routes.types';

export const areAllRoutesDisabled = (routes: ISidebarRoutes[]) => {
    return routes.every(route => route.active === false);
};

export const generalItemTranslation = (key: string, domain: TranslationsKeys) =>
    i18n.t(key, { ns: domain });

export const generateDefaultValues = <T extends object>(): T => {
    const defaultValues = {} as T;

    Object.keys(defaultValues).forEach(key => {
        (defaultValues as any)[key] = ''; // Asigna valores genéricos predeterminados
    });

    return defaultValues;
};

export const formatHTMLText = (msg: string) => {
    return msg
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/\n\n/g, '\n')
        .replace(/<li>\s*\n/g, '<li>')
        .replace(/<\/li>\s*\n/g, '</li>')
        .replace(/<ul>\s*\n/g, '<ul>')
        .replace(/<\/ul>\s*\n/g, '</ul>')
        .replace(/<ol>\s*\n/g, '<ol>')
        .replace(/<\/ol>\s*\n/g, '</ol>')
        .replace(/<\/strong>\s*\n/g, '</strong>')
        .replace(/\n/g, '<br />');
};

export const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
