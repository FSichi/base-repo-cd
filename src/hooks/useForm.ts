/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { generateDefaultValues } from 'utils/helpers/general.helpers';

interface CustomFormValidate {
    status: boolean;
    error: string;
}

interface Props<T> {
    defaultValues?: T;
    validate?: (values: T) => CustomFormValidate;
    submitAction?: (values: T) => void;
}

export const useForm = <T extends object>({ defaultValues, validate, submitAction }: Props<T>) => {
    const [formData, setFormData] = useState<T>(defaultValues || generateDefaultValues<T>());
    const [isEdited, setIsEdited] = useState<boolean>(false);

    const handleChange = <K extends keyof T>(key: K, value: T[K]) =>
        setFormData(prevState => ({ ...prevState, [key]: value }));

    const validateFields = (): boolean =>
        validate
            ? validate(formData).status
            : Object.values(formData as object).every(value => value !== '' && value !== undefined);

    const hasChanges = (): boolean =>
        Object.keys(formData as object).some(
            key => formData[key as keyof T] !== (defaultValues || ({} as T))[key as keyof T],
        );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log(validateFields() ? 'Validation approved' : 'Validation rejected');
        if (validate) {
            const validation = validate(formData);
            if (!validation.status) return toast.error(validation.error);
        } else {
            if (!validateFields())
                return toast.error('Por favor, rellena y valida todos los campos');
        }

        if (submitAction) submitAction(formData);
    };

    useEffect(() => {
        setIsEdited(hasChanges());
    }, [formData]);

    return { formData, handleChange, handleSubmit, isEdited };
};
