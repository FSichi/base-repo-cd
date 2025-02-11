// import { useTranslation } from 'react-i18next';
import { CopyrigthText } from 'utils/constants/appConstants';
import { Styles } from './Footer.styled';

export const Footer = () => {
    // const { t } = useTranslation('footer');

    return (
        <footer className={Styles.footerContainer}>
            <section>
                <h1 className={Styles.title}>{CopyrigthText}</h1>
            </section>
        </footer>
    );
};
