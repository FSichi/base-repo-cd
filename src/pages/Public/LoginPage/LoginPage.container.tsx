import { useTranslation } from 'react-i18next';
import { LoginPage } from './LoginPage';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RoutesListPaths } from 'routes';
import { TranslationsKeys } from 'utils/i18n';
import { FormEvent, useState } from 'react';
import AuthService from 'db/services/auth/authorization.service';
import { LoginRequest } from 'db/interfaces/Authorization';
import { useAction } from 'hooks/db/useAction';
import { InputHTMLEvent } from 'utils/interfaces/general.types';
import toast from 'react-hot-toast';

export interface Props {}

export const LoginPageContainer = (props: Props) => {
    // const {} = props;
    const { t } = useTranslation(TranslationsKeys.AUTH);
    const { saveCredentials } = useAuth();
    const navigate = useNavigate();

    const [verificationSection, setVerificationSection] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const { mutate, isLoading } = useAction({
        name: 'Auth-Login',
        endpoint: (data: LoginRequest) => AuthService.getLogin({ ...data }),
    });

    const [formFields, setFormFields] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: InputHTMLEvent) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate(formFields, {
            onSuccess: ({ data }) => {
                saveCredentials({
                    auth: data.data.auth,
                    user: data.data.user,
                    company: data.data.company,
                    role: data.data.user.roles[0],
                });
                navigate(RoutesListPaths.ROOT);
                toast.success('Inicio de sesión exitoso');
            },
            onError: () => {
                toast.error('Error al iniciar sesión');
            },
        });
    };

    const childProps = {
        ...props,
        t,
        handleSubmit,
        handleChange,
        formFields,
        isLoading,
        showPassword,
        handleShowPassword,
        verificationSection,
        setVerificationSection,
    };

    return <LoginPage {...childProps} />;
};
