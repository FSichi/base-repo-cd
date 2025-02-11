interface Props {
    size?: 'small' | 'default' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
    width?: 'full' | 'auto' | 'custom';
    customWidth?: string;
    customStyles?: string;
    iconLocation?: 'left' | 'right';
    textStyles?: string;
}

export const Styles = ({
    size = 'default',
    variant = 'primary',
    width = 'auto',
    customWidth = '',
    customStyles = '',
    iconLocation = 'left',
    textStyles,
}: Props) => {
    const baseStyles =
        'px-6 py-3 rounded-lg font-medium text-base z-10 flex justify-center items-center transition-all duration-200 ease-in-out cursor-pointer';

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
            background: 'bg-gradient hover:bg-hoverBPGradient hover:shadow-shadowButton',
            text: textStyles ?? 'text-white',
            border: 'border-none',
            active: 'active:bg-activeBPGradient active:shadow-shadowButton',
            disabled: 'disabled:hover:bg-gradient disabled:shadow-transparent disabled:opacity-50',
        },
        secondary: {
            base: baseStyles,
            background: 'bg-white hover:bg-cia-purpleBlue-main',
            text: textStyles ?? 'text-cia-gray-dark hover:text-white',
            border: 'border border-cia-grey-light',
            active: 'active:bg-activeBSGradient',
            disabled: 'disabled:bg-disabledBSGradient disabled:border-none disabled:text-white',
        },
        tertiary: {
            base: baseStyles,
            background: 'bg-transparent hover:bg-[#E9E9FF]',
            text: textStyles ?? 'text-cia-purpleBlue-main',
            border: 'border border-cia-grey-light',
            active: 'active:bg-cia-purpleBlue-main active:text-white',
            disabled: 'disabled:hover:bg-transparent disabled:text-[#ACA9E3]',
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
