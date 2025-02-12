import { memo, ReactNode } from 'react';
import { Button } from './Button';
import { ButtonRounded, ButtonSizes, ButtonVariants } from 'utils/interfaces/ui';

export interface Props {
    type?: 'submit' | 'button' | 'reset';
    variant?: ButtonVariants;
    size?: ButtonSizes;
    rounded?: ButtonRounded;
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
    const {
        type = 'button',
        variant = 'primary',
        size = 'default',
        iconLocation = 'left',
        rounded = 'lg',
    } = props;

    const childProps = {
        ...props,
        type,
        variant,
        size,
        iconLocation,
        rounded,
    };

    return <Button {...childProps} />;
};

export const MemoizedButtonContainer = memo(ButtonContainer);
