import { useTranslation } from 'react-i18next';
import { HomePage } from './HomePage';

export interface Props {}

export const HomePageContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation();

    const childProps = {
        ...props,
        t,
    };

    return <HomePage {...childProps} />;
};
