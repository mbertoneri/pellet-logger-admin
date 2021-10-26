import { useFetchProfile } from 'hooks/useConnectedUsers';
import Cookies from 'js-cookie';
import { paths } from 'pages/routes';
import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userSelectors from 'store/user/selectors';

export const AuthenticatedLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    const connected = useSelector(userSelectors.selectIsConnected);
    const token = Cookies.get(process.env.REACT_APP_JWT_PATH || 'jwt_token');
    const history = useHistory();
    const { refetch } = useFetchProfile();

    useEffect(() => {
        if (!connected && !token) {
            history.push(paths.user.USER_LOGIN);
        }
        if (token && !connected) {
            // noinspection JSIgnoredPromiseFromCall
            refetch();
        }
    }, [connected, history, token]);

    return <>{children}</>;
};
