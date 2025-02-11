import { IconSVGComponent } from 'utils/interfaces/general.types';

interface Props {
    Icon: IconSVGComponent;
    size?: number;
    color?: string;
    activeColor?: string;
    isActive?: boolean;
    className?: string;
    action?: () => void;
}

export const CustomIcon = ({
    Icon,
    size = 20,
    color = '#E0DFF5',
    activeColor = '#758FFF',
    isActive = false,
    className = '',
    action,
}: Props) => {
    return (
        <Icon
            onClick={action}
            width={size}
            height={size}
            stroke={isActive ? activeColor : color}
            fill='none'
            className={className}
        />
    );
};
