import { useTranslation } from 'react-i18next';
import { TemplateName } from './TemplateName';

export interface Props {}

export const TemplateNameContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation();

    const childProps = {
        ...props,
        t,
    };

    return <TemplateName {...childProps} />;
};
