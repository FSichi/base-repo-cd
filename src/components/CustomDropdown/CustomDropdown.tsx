import { JSX, RefObject } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Props as ContainerProps } from './CustomDropdown.container';

interface Props extends ContainerProps {
    Trigger: JSX.Element;
    dropdownRef: RefObject<HTMLDivElement | null>;
}

export const CustomDropdown = (props: Props) => {
    const { children, placement, id, isOpen, onClose, Trigger, dropdownRef, customContentStyles } =
        props;

    return (
        <Popover placement={placement} isOpen={isOpen} onClose={onClose} ref={dropdownRef}>
            <PopoverTrigger id={id}>{Trigger}</PopoverTrigger>
            <PopoverContent
                className={`${id !== 'calendar-dropdown' && 'rounded-md'} p-0 ${customContentStyles}`}>
                {children}
            </PopoverContent>
        </Popover>
    );
};
