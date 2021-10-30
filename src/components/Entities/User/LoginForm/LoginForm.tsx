import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import {
    Alert,
    CenterAlignedContainer,
    Form as StyledForm,
    TextField,
} from 'components/Entities/User/LoginForm/styled';
import { schema } from 'components/Entities/User/LoginForm/validation';
import ValidationErrorMessage from 'components/Form/ValidationErrorMessage';
import { useConnect } from 'hooks/useConnectedUsers';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { requestSelector } from 'store/request/selectors';
import { LoginFormValues } from 'typings/forms';

type Props = {
    initialValues: LoginFormValues;
};

export const Form: React.FC<Props> = ({ initialValues }) => {
    const { t } = useTranslation(['form', 'errors']);
    const connecting = useSelector(requestSelector.selectPending);
    const formMethods = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods;
    const { errorMessage, connect } = useConnect();

    return (
        <>
            <FormProvider {...formMethods}>
                <StyledForm onSubmit={handleSubmit(connect)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                error={Boolean(errors.email)}
                                name="email"
                                label={t('form:fields.email')}
                                helperText={<ValidationErrorMessage error={errors.email?.message} />}
                                fullWidth
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={Boolean(errors.password)}
                                name="password"
                                type="password"
                                label={t('form:fields.password')}
                                helperText={<ValidationErrorMessage error={errors.password?.message} />}
                                fullWidth
                                variant="filled"
                            />
                            {errorMessage && (
                                <Alert elevation={6} variant="filled" severity="error">
                                    {t(errorMessage)}
                                </Alert>
                            )}
                        </Grid>
                        <CenterAlignedContainer item xs={12}>
                            <Button variant="contained" color="primary" disabled={connecting} type="submit">
                                {t('form:buttons.connect')}
                            </Button>
                        </CenterAlignedContainer>
                    </Grid>
                </StyledForm>
            </FormProvider>
        </>
    );
};
