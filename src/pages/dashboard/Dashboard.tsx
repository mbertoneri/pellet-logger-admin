import BottomBar from 'components/Layout/BottomBar';
import RootContainer from 'components/Layout/RootContainer';
import Toolbar from 'components/Layout/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import userSelectors from 'store/user/selectors';

export const Dashboard: React.FC = () => {
    const connectedUser = useSelector(userSelectors.selectConnectedUser);
    const { t } = useTranslation(['dashboard']);

    console.log('dash', connectedUser);

    return (
        <RootContainer>
            {connectedUser && <>Dashboard hehe</>}
            <BottomBar />
        </RootContainer>
    );
};
