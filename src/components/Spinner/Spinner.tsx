import './styles.css';

interface Props {
    height?: string;
    size?: 'small' | 'medium' | 'large';
}

const sizeStyles: { [key: string]: string } = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large',
};

export const Spinner = ({ height = 'h-[220px]', size = 'medium' }: Props) => {
    return (
        <div className={`flex justify-center items-center ${height}`}>
            <span className={sizeStyles[size]}></span>
        </div>
    );
};
