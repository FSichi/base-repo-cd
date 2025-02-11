import { ReactNode } from 'react';
import ImgLogo from 'assets/img/logo-white.png';
import Styles from './PageLayout.styled';
import { QuoteSection } from './Element/QuoteSection';
import { CopyrigthText } from 'utils/constants/appConstants';

interface Props {
    children: ReactNode;
    customClassName?: string;
}

export const PublicPageLayout = ({ children, customClassName }: Props) => {
    return (
        <section className={`${customClassName} ${Styles.public.containerSection}`}>
            <section className={Styles.public.gradientSection}>
                <img
                    src={ImgLogo}
                    alt="LogoIMG Codetria"
                    className={Styles.public.logoImg}
                    width={192}
                    height={41}
                />
                <QuoteSection />
                <p className={Styles.public.copyrigth}>{CopyrigthText}</p>
            </section>
            <section className={Styles.public.containerPage}>{children}</section>
        </section>
    );
};
