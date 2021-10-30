import { Button } from '@mui/material';
import { Lock as AccessDeniedIcon } from '@mui/icons-material';
import { paths } from 'pages/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Container, Title } from 'components/Security/NotGranted/styled';

export const NotGranted: React.FC = () => {
    const { t } = useTranslation('errors');
    const history = useHistory();

    return (
        <Container>
            <AccessDeniedIcon color="primary" fontSize="large" />
            <Title variant="h5">{t('errors:not_granted.title')}</Title>
            <Button
                variant="outlined"
                color="primary"
                onClick={(): void => history.replace(paths.dashboard.DASHBOARD_INDEX)}
            >
                {t('errors:not_granted.go_back')}
            </Button>
        </Container>
    );
};
