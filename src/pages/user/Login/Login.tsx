import { Container, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import LoginForm from 'components/Entities/User/LoginForm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginFormValues } from 'typings/forms';
import { AvatarIcon, Main } from './styled';

const initialValues: LoginFormValues =
    process.env.NODE_ENV === 'production'
        ? { email: '', password: '' }
        : {
              email: 'user@test.com',
              password: 'P@ssw0rd',
          };

export const Login: React.FC = () => {
    const { t } = useTranslation(['user']);
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Main>
                    <AvatarIcon>
                        <LockOutlinedIcon />
                    </AvatarIcon>
                    <Typography component="h1" variant="h3">
                        {t('user:login.title')}
                    </Typography>
                    <Typography component="h2" variant="h5">
                        {t('user:login.subtitle')}
                    </Typography>
                    <LoginForm initialValues={initialValues} />
                </Main>
            </Container>
        </>
    );
};
