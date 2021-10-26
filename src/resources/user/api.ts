import { AxiosPromise } from 'axios';
import { createResourceApi } from 'resources/ResourceApi';
import { requestApi } from 'services/axios';
import { AuthApiToken, UserApiItem } from 'typings/api';
import { LoginFormValues } from 'typings/forms';

const login = (payload: LoginFormValues): AxiosPromise<AuthApiToken> =>
    requestApi({
        secure: false,
        method: 'POST',
        url: 'authentication_token',
        data: payload,
    });

const getProfile = (admin: boolean): AxiosPromise<UserApiItem> =>
    requestApi({
        url: admin ? 'admin_users/me' : '/users/me',
    });

export default {
    ...createResourceApi<UserApiItem>('users'),
    login,
    getProfile,
};
