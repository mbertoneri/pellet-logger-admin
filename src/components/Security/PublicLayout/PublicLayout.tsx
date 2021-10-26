import { useFetchProfile } from 'hooks/useConnectedUsers';
import Cookies from 'js-cookie';
import { paths } from 'pages/routes';
import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import userSelectors from 'store/user/selectors';

export const PublicLayout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    const connected = useSelector(userSelectors.selectIsConnected);
    const history = useHistory();
    const token = Cookies.get(process.env.REACT_APP_JWT_PATH || 'jwt_token');
    const { refetch } = useFetchProfile();

    useEffect(() => {
        if (token && !connected) {
            // noinspection JSIgnoredPromiseFromCall
            refetch();
        }
        if (connected) {
            history.push(paths.dashboard.DASHBOARD_INDEX);
        }
    }, [token, connected, history]);

    return <>{children}</>;
};
