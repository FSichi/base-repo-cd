import { memo, ReactNode } from 'react';
import { Button } from './Button';

export type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'transparent';

export interface Props {
    type?: 'submit' | 'button' | 'reset';
    variant?: ButtonVariants;
    size?: 'small' | 'default' | 'large';
    disabled?: boolean;
    onClick?: () => void;
    text?: string;
    icon?: string;
    iconLocation?: 'left' | 'right';
    children?: ReactNode;
    width?: 'full' | 'auto' | 'custom';
    customWidth?: string;
    customStyles?: string;
    textStyles?: string;
}

export const ButtonContainer = (props: Props) => {
    const { type = 'button', variant = 'primary', size = 'default', iconLocation = 'left' } = props;

    const childProps = {
        ...props,
        type,
        variant,
        size,
        iconLocation,
    };

    return <Button {...childProps} />;
};

export const MemoizedButtonContainer = memo(ButtonContainer);
