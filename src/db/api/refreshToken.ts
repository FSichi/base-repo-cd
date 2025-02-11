import axios from 'axios';
import { TokenManager } from './TokenManager';
import { V_BASE_URL } from 'utils/constants/envVarConstants';

export const refreshAccessToken = async (): Promise<string> => {
    const tokenManager = TokenManager.getInstance();
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await axios.post<{
        access_token: string;
        expires_in: number;
        id_token: string;
    }>(
        `${V_BASE_URL}/v1/auth/admins/refresh-token`,
        {
            refresh_token: refreshToken,
        },
        {
            headers: {
                'Cache-Control': 'private, max-age=31536000, no-cache',
            },
        },
    );

    const { access_token: accessToken } = response.data;

    tokenManager.setTokens({ accessToken, refreshToken });

    return accessToken;
};
