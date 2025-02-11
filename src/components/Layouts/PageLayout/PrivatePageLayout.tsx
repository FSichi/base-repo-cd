import { ReactNode } from 'react';
import Styles from './PageLayout.styled';

interface Props {
    children: ReactNode;
    customClassName?: string;
}

export const PrivatePageLayout = ({ children, customClassName }: Props) => {
    return (
        <section className={`${customClassName} ${Styles.private.containerSection}`}>
            <section className={Styles.private.containerPage}>{children}</section>
        </section>
    );
};
