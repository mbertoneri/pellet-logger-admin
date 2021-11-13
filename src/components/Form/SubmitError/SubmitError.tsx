import { Grid, Alert } from '@mui/material';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { requestSelector } from 'store/request/selectors';

export const SubmitError = (): ReactElement => {
    const { t } = useTranslation(['errors']);
    const apiError = useSelector(requestSelector.selectDescription);

    return (
        <Grid item xs={12} hidden={!Boolean(apiError)}>
            <Alert severity="error">{t('errors:form.submit_error')}</Alert>
        </Grid>
    );
};
