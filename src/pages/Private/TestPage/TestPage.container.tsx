import { useTranslation } from 'react-i18next';
import { TestPage } from './TestPage';

export interface Props {}

export const TestPageContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation();

    const childProps = {
        ...props,
        t,
    };

    return <TestPage {...childProps} />;
};
