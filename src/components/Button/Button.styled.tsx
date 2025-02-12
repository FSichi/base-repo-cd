import { ButtonRounded } from 'utils/interfaces/ui';

interface Props {
    size?: 'small' | 'default' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
    width?: 'full' | 'auto' | 'custom';
    customWidth?: string;
    customStyles?: string;
    iconLocation?: 'left' | 'right';
    textStyles?: string;
    rounded?: ButtonRounded;
}

export const Styles = ({
    size = 'default',
    variant = 'primary',
    width = 'auto',
    customWidth = '',
    customStyles = '',
    iconLocation = 'left',
    textStyles,
    rounded,
}: Props) => {
    const baseStyles = `px-6 py-3 rounded-${rounded} font-medium typography-text z-10 flex justify-center items-center transition-all duration-300 ease-in-out cursor-pointer`;

    const sizeClasses = {
        small: 'text-sm h-small',
        default: 'text-base h-medium',
        large: 'text-base h-large',
    };

    const widthClasses = {
        full: 'w-full',
        auto: 'w-auto',
        custom: customWidth,
    };

    const variantStyles = {
        primary: {
            base: baseStyles,
            background: 'bg-primary-500 hover:bg-primary-700 hover:shadow-shadowButton',
            text: textStyles ?? 'text-white',
            border: 'border-none',
            active: 'active:bg-primary-900 active:shadow-shadowButton',
            disabled:
                'disabled:hover:bg-primary-500 disabled:shadow-transparent disabled:opacity-50',
        },
        secondary: {
            base: baseStyles,
            background: 'bg-white hover:bg-primary-500',
            text: textStyles ?? 'text-text hover:text-white',
            border: 'border border-gray-400',
            active: 'active:bg-primary-700 active:shadow-shadowButton',
            disabled: 'disabled:bg-primary-400/50 disabled:border-none disabled:text-white',
        },
        tertiary: {
            base: baseStyles,
            background: 'bg-transparent hover:bg-primary-500',
            text: textStyles ?? 'text-primary-500 hover:text-white',
            border: 'border border-primary-400',
            active: 'active:bg-primary-700 active:text-white',
            disabled:
                'disabled:hover:bg-transparent disabled:text-[#ACA9E3] disabled:border-gray-400',
        },
        transparent: {
            base: baseStyles,
            background: 'bg-transparent',
            text: textStyles ?? 'text-cia-grey-dark',
            border: 'border-none',
            active: 'active:text-cia-grey-dark',
            disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
        },
    };

    const finalStyles = `
        ${sizeClasses[size] || sizeClasses.default}
        ${widthClasses[width] || widthClasses.auto}
        ${variantStyles[variant].base}
        ${variantStyles[variant].background}
        ${variantStyles[variant].text}
        ${variantStyles[variant].border}
        ${variantStyles[variant].active}
        ${variantStyles[variant].disabled}
        ${customStyles}
    `;

    return {
        container: `${finalStyles}`,
        img: iconLocation === 'left' ? 'mr-2 -ml-1' : 'ml-2',
    };
};

export default Styles;
