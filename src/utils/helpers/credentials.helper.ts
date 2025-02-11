import { ICredentials } from 'db/interfaces/Authorization';

const key = 'credentials-baserepo';

export const setCredentialsLocalStorage = (data: ICredentials): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getCredentialsLocalStorage = (): ICredentials | undefined => {
    try {
        const stringified = localStorage.getItem(key);
        let credentials: ICredentials | undefined;

        if (stringified) credentials = JSON.parse(stringified);
        if (!credentials) return undefined;

        return credentials;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const clearCredentialsLocalStorage = (): void => {
    localStorage.removeItem(key);
};

export const getValueFromLocalStorage = <T>(key: string): T | undefined => {
    try {
        const stringified = localStorage.getItem(key);
        let value: T | undefined;

        if (stringified) value = JSON.parse(stringified);
        if (!value) return undefined;

        return value;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};
