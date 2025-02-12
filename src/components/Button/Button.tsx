import { Props as ContainerProps } from './Button.container';
import Styles from './Button.styled';

interface Props extends ContainerProps {}

export const Button = (props: Props) => {
    const {
        text,
        variant,
        children,
        disabled,
        icon,
        onClick,
        size,
        type,
        customWidth,
        width,
        customStyles,
        textStyles,
        iconLocation,
        rounded,
    } = props;

    const St = Styles({
        size,
        variant,
        width,
        customWidth,
        customStyles,
        iconLocation,
        textStyles,
        rounded,
    });

    return (
        <button type={type} disabled={!!disabled} onClick={onClick} className={St.container}>
            <div className={icon ? 'flex' : ''}>
                {icon && iconLocation === 'left' && (
                    <img src={icon} alt='button-icon' className={St.img} />
                )}
                {children}
                {!children && <p>{text}</p>}
                {icon && iconLocation === 'right' && (
                    <img src={icon} alt='button-icon' className={St.img} />
                )}
            </div>
        </button>
    );
};
