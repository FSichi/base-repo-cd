import { Props as ContainerProps } from './TestPage.container';
import { ITranslate } from 'utils/interfaces/general.types';
import Styles from './TestPage.styled';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const TestPage = (_props: Props) => {
    return <section className={Styles.container}>TestPage</section>;
};
