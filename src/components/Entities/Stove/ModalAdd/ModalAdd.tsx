import { Grid, Typography } from '@mui/material';
import DrawerContent from 'components/Display/ModalDrawer/DrawerContent';
import ModalDrawer from 'components/Display/ModalDrawer/ModalDrawer';
import Form from 'components/Entities/Stove/Form';
import { invalidateAllPages, QueryType } from 'hooks/useCrudQueries';
import { DateTime } from 'luxon';
import React, { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { requestApi } from 'services/axios';
import { flash } from 'services/bus';
import { UserStoveApiItem } from 'typings/api';
import { StoveFormValues } from 'typings/forms';

type Props = {
    onClose: () => any;
    onSave: () => any;
};

export const ModalAdd: React.FC<Props> = ({ onClose, onSave }) => {
    const formRef = createRef<HTMLFormElement>();
    const client = useQueryClient();
    const { t } = useTranslation('stove');

    const onSubmitMutation = useMutation(
        (data: StoveFormValues) =>
            requestApi<UserStoveApiItem>({
                url: '/user_stoves',
                method: 'POST',
                data,
            }).then((response) => response.data),
        {
            mutationKey: ['user_stoves'],
            onSuccess: async (_data: UserStoveApiItem) => {
                await client.invalidateQueries({
                    predicate: (query) => invalidateAllPages('user_stoves', query as QueryType),
                });
                flash({ message: 'stove:add.success', type: 'success' });
                onSave();
            },
        },
    );

    const initialValues: StoveFormValues = {
        purchasePrice: 0,
        stove: '',
        stoveBrand: '',
        purchasedAt: DateTime.now().toJSON(),
    };

    const onSubmit = (data: StoveFormValues): void => {
        onSubmitMutation.mutate(data);
    };

    return (
        <ModalDrawer anchor="right" open onClose={onClose}>
            <DrawerContent elevation={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div">
                            {t('stove:add.title')}
                        </Typography>
                    </Grid>
                </Grid>
                <Form ref={formRef} initialValues={initialValues} onSubmit={onSubmit} />
            </DrawerContent>
        </ModalDrawer>
    );
};
