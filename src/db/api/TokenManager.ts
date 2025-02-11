import {
    getCredentialsLocalStorage,
    setCredentialsLocalStorage,
} from 'utils/helpers/credentials.helper';

type TokenType = string | null;

interface TokenStorage {
    accessToken: string;
    refreshToken: string;
}

export class TokenManager {
    private static instance: TokenManager;
    private accessToken: TokenType = null;
    private refreshToken: TokenType = null;

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    public setTokens(tokens: TokenStorage): void {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;

        const credentials = getCredentialsLocalStorage();

        setCredentialsLocalStorage({
            ...credentials!,
            auth: {
                ...credentials?.auth!,
                access_token: this.accessToken,
                refresh_token: this.refreshToken,
            },
        });
    }

    public getAccessToken(): TokenType {
        return this.accessToken;
    }

    public getRefreshToken(): TokenType {
        return this.refreshToken;
    }

    public clearTokens(): void {
        this.accessToken = null;
        this.refreshToken = null;
    }
}
