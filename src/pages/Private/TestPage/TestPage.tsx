import { Props as ContainerProps } from './TestPage.container';
import { ITranslate } from 'utils/interfaces/general.types';
import Styles from './TestPage.styled';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const TestPage = (props: Props) => {
    const { t } = props;
    return <section className={Styles.container}>TestPage</section>;
};
