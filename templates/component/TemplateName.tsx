import { Props as ContainerProps } from './TemplateName.container';
import Styles from './TemplateName.styled';
import { ITranslate } from 'utils/interfaces/general.types';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const TemplateName = (props: Props) => {
    const { t } = props;
    return (
        <>
            <h1 className={Styles.styleName}>TemplateName</h1>
        </>
    );
};
