import { Grid, Typography } from '@mui/material';
import DrawerContent from 'components/Display/ModalDrawer/DrawerContent';
import ModalDrawer from 'components/Display/ModalDrawer/ModalDrawer';
import Form from 'components/Entities/Supply/Form';
import { useAddMutation } from 'hooks/useCrudQueries';
import { DateTime } from 'luxon';
import React, { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import supplyResource from 'resources/supply/index';
import { ApiPushItem, SupplyApiItem } from 'typings/api';
import { SupplyFormValues } from 'typings/forms';

type Props = {
    onClose: () => any;
    onSave: () => any;
};

export const ModalAdd: React.FC<Props> = ({ onClose, onSave }) => {
    const formRef = createRef<HTMLFormElement>();
    const mutation = useAddMutation(supplyResource, false);
    const { t } = useTranslation('supply');

    const initialValues: SupplyFormValues = {
        deliveredQuantity: 0.0,
        unitPrice: 0.0,
        deliveryPrice: 0.0,
        pelletBrand: '',
        purchasedAt: DateTime.now().toJSON(),
    };

    const onSubmit = (data: SupplyFormValues): void => {
        console.log(data);
        const toPush: ApiPushItem<SupplyApiItem> = {
            deliveredQuantity: data.deliveredQuantity,
            quantity: data.deliveredQuantity,
            unitPrice: data.unitPrice,
            deliveryPrice: data.deliveryPrice,
            pelletBrand: data.pelletBrand,
            purchasedAt: data.purchasedAt,
        };
        mutation.mutate(toPush, {
            onSuccess: (): void => onSave(),
        });
    };

    return (
        <ModalDrawer anchor="right" open onClose={onClose}>
            <DrawerContent elevation={0}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="div">
                            {t('supply:add.title')}
                        </Typography>
                    </Grid>
                </Grid>
                <Form ref={formRef} initialValues={initialValues} onSubmit={onSubmit} />
            </DrawerContent>
        </ModalDrawer>
    );
};
