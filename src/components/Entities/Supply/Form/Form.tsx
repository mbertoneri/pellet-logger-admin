import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputAdornment } from '@mui/material';
import EntitySelect from 'components/Form/EntitySelect';
import LocalizedDatePicker from 'components/Form/LocalizedDatePicker';
import SubmitError from 'components/Form/SubmitError';
import TextField from 'components/Form/TextField';
import useCustomForm from 'hooks/useCustomForm';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import brandApi from 'resources/pelletBrand/api';
import { PelletBrandApiItem } from 'typings/api';
import { SupplyFormValues } from 'typings/forms';
import { schema } from './schema';

type Props = React.RefAttributes<HTMLFormElement> & {
    initialValues: SupplyFormValues;
    onSubmit: (_data: SupplyFormValues) => any;
};

export const Form: React.FC<Props> = React.forwardRef(({ initialValues, onSubmit }, forwardedRef) => {
    const { t } = useTranslation('form');

    const { handleSubmitPromise, ...formMethods } = useCustomForm<SupplyFormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
        onValid: onSubmit,
    });

    return (
        <FormProvider {...formMethods}>
            <form ref={forwardedRef} onSubmit={handleSubmitPromise}>
                <Grid container spacing={2}>
                    <SubmitError />
                    <Grid item xs={12}>
                        <TextField
                            name="unitPrice"
                            fullWidth
                            label={t('form:fields:supply:modal_add.unit_price')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="deliveredQuantity"
                            fullWidth
                            label={t('form:fields:supply:modal_add.delivered_quantity')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {t('form:fields:supply:modal_add.bags')}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EntitySelect
                            label={t('form:fields:supply:modal_add.pellet_brand')}
                            api={brandApi}
                            getLabel={(brand: PelletBrandApiItem): string => brand.title}
                            withEmpty={true}
                            name="pelletBrand"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="deliveryPrice"
                            fullWidth
                            label={t('form:fields:supply:modal_add.delivery_price')}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizedDatePicker
                            name="purchasedAt"
                            label={t('form:fields:supply:modal_add.purchased_at')}
                            fullWidth
                            defaultValue={initialValues.purchasedAt}
                        />
                    </Grid>
                    <Grid container item xs={12} alignContent="center" alignItems="center" justifyContent="center">
                        <Button color="primary" type="submit">
                            {t('form:buttons.save')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
});
