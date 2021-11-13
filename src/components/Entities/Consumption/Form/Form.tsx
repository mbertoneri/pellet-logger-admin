import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputAdornment } from '@mui/material';
import EntitySelect from 'components/Form/EntitySelect';
import SubmitError from 'components/Form/SubmitError';
import TextField from 'components/Form/TextField';
import useCustomForm from 'hooks/useCustomForm';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import supplyApi from 'resources/supply/api';
import { PelletBrandApiItem, SupplyApiItem } from 'typings/api';
import { ConsumptionFormValues } from 'typings/forms';
import { schema } from './schema';

type Props = React.RefAttributes<HTMLFormElement> & {
    initialValues: ConsumptionFormValues;
    onSubmit: (_data: ConsumptionFormValues) => any;
    pelletBrands: Array<PelletBrandApiItem>;
};

export const Form: React.FC<Props> = React.forwardRef(({ initialValues, onSubmit, pelletBrands }, forwardedRef) => {
    const { t } = useTranslation('form');

    const { handleSubmitPromise, ...formMethods } = useCustomForm<ConsumptionFormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
        onValid: onSubmit,
    });

    const brandLabel = (iri: string): string | undefined => pelletBrands.find((brand) => brand['@id'] === iri)?.title;

    return (
        <FormProvider {...formMethods}>
            <form ref={forwardedRef} onSubmit={handleSubmitPromise}>
                <Grid container spacing={2}>
                    <SubmitError />
                    <Grid item xs={12}>
                        <TextField
                            name="quantity"
                            fullWidth
                            label={t('form:fields:consumptions:modal_add.quantity')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {t('form:fields:consumptions:modal_add.unit')}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EntitySelect
                            label={t('form:fields:consumptions:modal_add.supply')}
                            api={supplyApi}
                            getLabel={(supply: SupplyApiItem): string =>
                                `${brandLabel(supply.pelletBrand ?? 'notset')} (${supply.quantity})`
                            }
                            withEmpty={true}
                            name="supply"
                            filtersApi={{ quantity: { gt: 0 } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="comment"
                            fullWidth
                            label={t('form:fields:consumptions:modal_add.comment')}
                            multiline
                            rows={2}
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
