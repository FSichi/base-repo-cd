import { Props as ContainerProps } from './LoginPage.container';
import { InputHTMLEvent, ITranslate } from 'utils/interfaces/general.types';
import { Link } from 'react-router-dom';
import { RoutesListPaths } from 'routes';
import { Button } from 'components/Button';
import { Styles } from './LoginPage.styled';
import { FormEvent } from 'react';
import { Spinner } from 'components/Spinner';
import { HidePasswordSVG, ShowPasswordSVG } from 'assets/icons';

interface Props extends ContainerProps {
    t: ITranslate;
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: InputHTMLEvent) => void;
    isLoading: boolean;
    formFields: {
        username: string;
        password: string;
    };
    showPassword: boolean;
    handleShowPassword: () => void;
}

export const LoginPage = (props: Props) => {
    const {
        t,
        handleSubmit,
        formFields,
        handleChange,
        isLoading,
        handleShowPassword,
        showPassword,
    } = props;

    return (
        <section className={Styles.container}>
            <div className={Styles.title}>
                <h1>{t('login_welcome')}</h1>
                <p className={Styles.subtitle}>{t('login_subtitle')}</p>
            </div>
            <form onSubmit={handleSubmit} className='grid gap-4 text-cia-white mt-0'>
                <div>
                    <p>{t('login_input_email')}</p>
                    <input
                        id='username'
                        name='username'
                        autoComplete='username'
                        type='email'
                        value={formFields.username}
                        onChange={handleChange}
                        placeholder={t('login_input_email_placeholder')}
                        className={Styles.input}
                    />
                </div>
                <div>
                    <p>{t('login_input_password')}</p>
                    <div className={Styles.passwordContainer}>
                        <input
                            id='password'
                            name='password'
                            autoComplete='current-password'
                            type={showPassword ? 'text' : 'password'}
                            value={formFields.password}
                            onChange={handleChange}
                            placeholder='Ingresa tu contraseña'
                            className={Styles.passwordInput}
                        />
                        <img
                            className='mr-5 mt-0.5 cursor-pointer'
                            onClick={handleShowPassword}
                            src={showPassword ? ShowPasswordSVG : HidePasswordSVG}
                            alt=''
                        />
                    </div>
                </div>
                <Link to={RoutesListPaths.ANY} className={Styles.link}>
                    {t('login_forgot_password')}
                </Link>

                <Button
                    type='submit'
                    variant='primary'
                    text='Iniciar Sesión'
                    disabled={isLoading}
                    customStyles='!rounded-lg'>
                    <div className='flex items-center gap-3'>
                        {isLoading && <Spinner size='small' height='h-[20px]' />}
                        <p> Iniciar Sesión</p>
                    </div>
                </Button>
            </form>
        </section>
    );
};
