import { ReactNode, useEffect, useRef } from 'react';
import { CustomDropdown } from './CustomDropdown';
import { DISABLED_POPOVER } from 'utils/constants/appConstants';

export interface Props {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    trigger: ReactNode;
    children: ReactNode;
    placement:
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
    customContentStyles?: string;
}

const hasVerticalScroll = () => {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
};

export const CustomDropdownContainer = (props: Props) => {
    const { trigger, onClose, id, isOpen, customContentStyles = '' } = props;

    const Trigger = <div>{trigger}</div>;
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (DISABLED_POPOVER.includes(id)) {
            const popover = document.getElementById(id);
            if (popover) {
                popover.removeAttribute('class');
                popover.removeAttribute('aria-expanded');
            }
        }
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
                onClose!();
        };

        const header = document.getElementById('header'); // Obtener el header por id

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (hasVerticalScroll()) {
                document.body.style.paddingRight = '6px';
                if (header) header.classList.add('-mr-[6px]'); // Agregar clase al header
            }
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (header) header.classList.remove('-mr-[6px]'); // Quitar clase del header
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            if (header) header.classList.remove('-mr-[6px]'); // Asegurarse de limpiar la clase en el cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const childProps = {
        ...props,
        Trigger,
        dropdownRef,
        customContentStyles,
    };

    return <CustomDropdown {...childProps} />;
};
