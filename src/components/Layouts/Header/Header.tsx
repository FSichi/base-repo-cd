import { Props as ContainerProps } from './Header.container';
import { ITranslate } from 'utils/interfaces/general.types';
import { RoutesListPaths } from 'routes';
import { Link } from 'react-router-dom';
import ImgLogo from 'assets/img/logo-dark.png';
import { Styles } from './Header.styled';
import ProfileDropdown from './Elements/ProfileDropdown';

interface Props extends ContainerProps {
    t: ITranslate;
}

export const Header = (_props: Props) => {
    return (
        <section className={Styles.headerContainer} style={{ backdropFilter: 'blur(14px)' }}>
            <Link to={RoutesListPaths.ROOT}>
                <img src={ImgLogo} alt='LogoIMG Codetria' className={Styles.logoImg} />
            </Link>
            <div className='flex gap-5 items-center'>
                <ProfileDropdown />
            </div>
        </section>
    );
};
