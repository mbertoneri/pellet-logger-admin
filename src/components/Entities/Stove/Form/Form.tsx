import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, LinearProgress } from '@mui/material';
import { schema } from 'components/Entities/Stove/Form/validation';
import DataSelect from 'components/Form/DataSelect';
import EntitySelect from 'components/Form/EntitySelect';
import SubmitError from 'components/Form/SubmitError';
import TextField from 'components/Form/TextField';
import useCustomForm from 'hooks/useCustomForm';
import { useQueryCollection } from 'hooks/useQueryCollection';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StoveApiItem, StoveBrandApiItem } from 'typings/api';
import { StoveFormValues } from 'typings/forms';
import brandApi from 'resources/stoveBrand/api';

type Props = React.RefAttributes<HTMLFormElement> & {
    initialValues: StoveFormValues;
    onSubmit: (_data: StoveFormValues) => any;
};

export const Form: React.FC<Props> = React.forwardRef(({ initialValues, onSubmit }, forwardedRef) => {
    const { t } = useTranslation('form');

    const { handleSubmitPromise, ...formMethods } = useCustomForm<StoveFormValues>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
        onValid: onSubmit,
    });

    const { watch, setValue } = formMethods;

    const brand = watch('stoveBrand');

    const { data: brandModels, isLoading } = useQueryCollection<StoveApiItem>(
        ['stoves', { brand }],
        () => brandApi.models(brand, 1, 100),
        {
            enabled: brand !== '',
        },
    );

    useEffect(() => {
        setValue('stove', '');
    }, [brand]);

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmitPromise} ref={forwardedRef}>
                <Grid container spacing={2}>
                    <SubmitError />
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={t('form:fields:stove:modal_add.purchase_price')}
                            name="purchasePrice"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EntitySelect
                            label={t('form:fields:stove:modal_add.stove_brand')}
                            api={brandApi}
                            getLabel={(brand: StoveBrandApiItem): string => brand.title}
                            withEmpty={true}
                            name="stoveBrand"
                        />
                    </Grid>
                    <Grid item xs={12} hidden={'' === brand}>
                        {isLoading && <LinearProgress />}
                        <DataSelect
                            data={brandModels ?? []}
                            name="stove"
                            label={t('form:fields:stove:modal_add.stove_model')}
                            withEmpty={true}
                            getLabel={(stove: StoveApiItem): string => stove.title}
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
