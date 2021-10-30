import RootContainer from 'components/Layout/RootContainer';
import Toolbar from 'components/Layout/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import userSelectors from 'store/user/selectors';

export const Dashboard: React.FC = () => {
    const connectedUser = useSelector(userSelectors.selectConnectedUser);
    const { t } = useTranslation(['dashboard']);

    return (
        <RootContainer>
            <Toolbar
                title={t('dashboard:header.title')}
                subtitle={t('dashboard:header.subtitle')}
                withDrawer={true}
                selectedElementInDrawer="dashboard"
            />
            {connectedUser && <>Dashboard</>}
        </RootContainer>
    );
};
