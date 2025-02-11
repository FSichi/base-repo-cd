import { Props as ContainerProps } from './HomePage.container';
import { ITranslate } from 'utils/interfaces/general.types';
import Styles from './HomePage.styled';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const HomePage = (props: Props) => {
    const { t } = props;
    return <section className={Styles.container}>HomePage</section>;
};
