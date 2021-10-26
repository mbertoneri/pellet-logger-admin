import Cookies from 'js-cookie';
import { useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { useDispatch } from 'react-redux';
import userAPI from 'resources/user/api';
import { getLinkedRoles, getRolesFromToken, getSwitchUser, getToken, isRoleGranted } from 'services/security';
import { actions } from 'store/user/slice';
import { UserApiItem } from 'typings/api';
import { Roles } from 'typings/enums';
import { LoginFormValues } from 'typings/forms';
import { OrNull } from 'typings/shared';

const MESSAGES = {
    badCredentials: 'user:errors.wrong_credential',
    default: 'user:errors.default_error',
};

export const useConnect = (): {
    errorMessage: OrNull<string>;
    connect: (_credentials: LoginFormValues) => Promise<unknown>;
} => {
    const { refetch } = useFetchProfile();
    const [errorMessage, setErrorMessage] = useState<OrNull<string>>(null);
    const connect = async (credentials: LoginFormValues): Promise<unknown> => {
        setErrorMessage(null);
        try {
            const {
                data: { token },
            } = await userAPI.login(credentials);
            Cookies.set(process.env.REACT_APP_JWT_PATH || 'jwt_token', token, {
                expires: 365,
                path: '/',
            });
            await refetch();
            return;
        } catch (err: any) {
            if (err.response && err.response.status && 401 === err.response.status) {
                setErrorMessage(MESSAGES.badCredentials);
            }

            setErrorMessage(MESSAGES.default);
        }
    };

    return {
        errorMessage,
        connect,
    };
};

export const useFetchProfile = (): UseQueryResult<UserApiItem> => {
    const dispatch = useDispatch();
    const roles = getRolesFromToken();
    const switchUser = getSwitchUser();
    const isGrantedAdmin = isRoleGranted(getLinkedRoles(roles), [Roles.ADMIN]);
    const token = getToken();
    return useQuery(
        ['profile', { token }],
        () =>
            userAPI.getProfile(isGrantedAdmin && null === switchUser).then(({ data }) => {
                dispatch(actions.connect(data));
                return data;
            }),
        {
            retry: false,
            enabled: false,
        },
    );
};
