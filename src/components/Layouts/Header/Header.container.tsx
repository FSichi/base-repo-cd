import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';

export interface Props {}

export const HeaderContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation();

    const childProps = {
        ...props,
        t,
    };

    return <Header {...childProps} />;
};

export const MemoizedHeaderContainer = memo(HeaderContainer);
