import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { useMemo } from 'react';
import { useAuthContext } from 'context/auth.context';

export const Error404 = () => {
    const { t } = useTranslation('notFoundPage');

    const { checkIfCredentialsExists } = useAuthContext();
    const isLoggedIn = useMemo(() => checkIfCredentialsExists(), [checkIfCredentialsExists]);
    const textColor = isLoggedIn ? 'text-gray-900' : 'text-cia-white';

    return (
        <section
            className={`flex flex-col justify-center items-center ${isLoggedIn && '2xl:mt-48'} ${textColor}`}>
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className={`mb-8 font-extrabold text-9xl ${textColor}`}>
                        <span className="sr-only">{t('error')}</span>
                        {t('error_code')}
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">{t('title')}</p>
                    <p className={`mt-4 mb-8 ${textColor}`}>{t('description')}</p>

                    <Link to={'/'} className="flex justify-center">
                        <Button
                            size="large"
                            variant="primary"
                            type="button"
                            text={t('button')}
                            customStyles="!rounded-lg"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Error404;
