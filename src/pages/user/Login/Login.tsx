import { Container, Typography } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import LoginForm from 'components/Entities/User/LoginForm';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginFormValues } from 'typings/forms';
import { AvatarIcon, Main } from './styled';

const initialValues: LoginFormValues =
    process.env.NODE_ENV === 'production'
        ? { username: '', password: '' }
        : {
              username: 'manager@dev.com',
              password: 'Easy321$',
          };

export const Login: React.FC = () => {
    const { t } = useTranslation(['user']);
    console.log('login!!');
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
