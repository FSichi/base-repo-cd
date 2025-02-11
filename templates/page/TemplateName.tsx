import { Props as ContainerProps } from './TemplateName.container';
import { ITranslate } from 'utils/interfaces/general.types';
import Styles from './TemplateName.styled';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const TemplateName = (props: Props) => {
    const { t } = props;
    return <section className={Styles.container}>TemplateName</section>;
};
