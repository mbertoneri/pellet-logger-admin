import { Grid, LinearProgress, Typography } from '@mui/material';
import DrawerContent from 'components/Display/ModalDrawer/DrawerContent';
import ModalDrawer from 'components/Display/ModalDrawer/ModalDrawer';
import Form from 'components/Entities/Consumption/Form';
import { useAllPagesQuery } from 'hooks/useAllPagesQuery';
import { invalidateAllPages, invalidateId, QueryType } from 'hooks/useCrudQueries';
import React, { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import brandResource from 'resources/pelletBrand';
import { iriToId, requestApi } from 'services/axios';
import { flash } from 'services/bus';
import { ApiPushItem, ConsumptionApiItem } from 'typings/api';
import { ConsumptionFormValues } from 'typings/forms';

type Props = {
    onClose: () => any;
    onSave: () => any;
};

export const ModalAdd: React.FC<Props> = ({ onClose, onSave }) => {
    const formRef = createRef<HTMLFormElement>();
    const { t } = useTranslation('supply');
    const client = useQueryClient();

    const { data: brandData, isLoading } = useAllPagesQuery({
        apiKey: brandResource.api.apiKey,
        apiMethod: brandResource.api.fetchPage,
    });

    const initialValues: ConsumptionFormValues = {
        quantity: 0.0,
        comment: '',
        supply: '',
    };

    const onSubmitMation = useMutation(
        (data: ApiPushItem<ConsumptionApiItem>) =>
            requestApi<ConsumptionApiItem>({
                url: '/consumptions',
                method: 'POST',
                data,
            }).then((response) => response.data),
        {
            mutationKey: 'supplies',
            onSuccess: async (data: ConsumptionApiItem) => {
                await client.invalidateQueries({
                    predicate: (query) =>
                        invalidateId('supplies', iriToId('supplies', data.supply), query as QueryType),
                });
                await client.invalidateQueries({
                    predicate: (query) => invalidateAllPages('supplies', query as QueryType),
                });

                flash({ message: `supply:add.consumption.success`, type: 'success' });
                onSave();
            },
        },
    );

    const onSubmit = (data: ConsumptionFormValues): void => {
        console.log(data);
        onSubmitMation.mutate(data as ConsumptionApiItem);
    };

    return (
        <ModalDrawer anchor="right" open onClose={onClose}>
            {isLoading && <LinearProgress />}
            <DrawerContent elevation={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div">
                            {t('supply:add.consumption.title')}
                        </Typography>
                    </Grid>
                </Grid>
                <Form ref={formRef} initialValues={initialValues} onSubmit={onSubmit} pelletBrands={brandData || []} />
            </DrawerContent>
        </ModalDrawer>
    );
};
