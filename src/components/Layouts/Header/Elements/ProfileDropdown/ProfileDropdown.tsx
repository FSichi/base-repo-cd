import { memo } from 'react';
import { Props as ContainerProps, UserInfo } from './ProfileDropdown.container';
import { Styles, TriggerStyles } from './ProfileDropdown.styled';
import { CustomIcon } from 'components/Icon/CustomIcon';
import { Button } from 'components/Button';
import { CustomDropdown } from 'components/CustomDropdown';
import { ITranslate } from 'utils/interfaces/general.types';
import { DropdownArrowIcon } from 'assets/icons';
import ImgProfile from 'assets/img/profile.webp';

interface Props extends ContainerProps {
    t: ITranslate;
    userInfo: UserInfo;
    logout: () => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const ProfileDropdown = (props: Props) => {
    const { userInfo, logout, isOpen, setIsOpen } = props;

    const ProfileTrigger = memo(function ProfileTrigger() {
        return (
            <section className={TriggerStyles.profileContainer} onClick={() => setIsOpen(!isOpen)}>
                <img src={ImgProfile} alt='ProfileIMG' className={TriggerStyles.profileImg} />
                <CustomIcon Icon={DropdownArrowIcon} color='black' size={12} />
            </section>
        );
    });

    const ProfileBody = memo(function ProfileBody() {
        return (
            <section className={Styles.container}>
                <div>
                    <h1 className={Styles.userName}>{userInfo.name}</h1>
                    <h2 className={Styles.userEmail}>{userInfo.email}</h2>
                </div>
                <div className='mt-3 mb-5 border p-2 px-4 rounded-md bg-cia-purpleBlue-light text-cia-white'>
                    {userInfo.company}
                </div>
                <div className={Styles.logoutContainer}>
                    <Button
                        size='small'
                        variant='primary'
                        text={'Cerrar Sesión'}
                        // icon={LogoutSVG}
                        customStyles={`${Styles.button}`}
                        width='custom'
                        customWidth='w-40 mx-4'
                        onClick={logout}
                    />
                </div>
            </section>
        );
    });

    return (
        <CustomDropdown
            id='profileDropdown'
            placement='bottom'
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            trigger={<ProfileTrigger />}>
            <ProfileBody />
        </CustomDropdown>
    );
};
