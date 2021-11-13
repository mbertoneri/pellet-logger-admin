import { Add as AddIcon } from '@mui/icons-material';
import AddSupplyIcon from '@mui/icons-material/AddShoppingCart';
import { Grid } from '@mui/material';
import FabButton from 'components/button/FabButton';
import ModalAddConsumption from 'components/Entities/Consumption/ModalAdd';
import ModalAddSupply from 'components/Entities/Supply/ModalAdd';
import SupplyWidget from 'components/Entities/Supply/Widget';
import BottomBar from 'components/Layout/BottomBar';
import ContentContainer from 'components/Layout/ContentContainer';
import RootContainer from 'components/Layout/RootContainer';
import { useAllPagesQuery } from 'hooks/useAllPagesQuery';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import supplyResource from 'resources/supply';
import { Roles } from 'typings/enums';
import { FabActionType } from 'typings/shared';

export const Dashboard: React.FC = () => {
    const { t } = useTranslation(['dashboard', supplyResource.translationKey]);
    const [addOpen, setAddOpen] = useState(false);
    const [supplyAdd, setSupplyAdd] = useState(false);

    const { data: supplies } = useAllPagesQuery({
        apiKey: supplyResource.api.apiKey,
        apiMethod: (page, itemsPerPage, filters) => supplyResource.api.fetchPage(page, itemsPerPage, filters),
        filters: { quantity: { gt: 0 } },
    });

    const fabActions: Array<FabActionType> = [
        {
            onClick: (): void => setSupplyAdd(true),
            key: 'add-supply',
            tooltip: t(`${supplyResource.translationKey}:fab_actions.supply`),
            roles: [Roles.BASE_USER],
            icon: <AddSupplyIcon color="primary" fontSize="large" />,
        },
        {
            onClick: (): void => setAddOpen(true),
            key: 'add',
            tooltip: t(`${supplyResource.translationKey}:fab_actions.consumption`),
            roles: [Roles.BASE_USER],
            icon: <AddIcon color="primary" fontSize="large" />,
        },
    ];

    return (
        <RootContainer>
            <ContentContainer>
                <Grid container spacing={1}>
                    {supplies &&
                        supplies.map((supply) => (
                            <Grid item xs={12} key={supply['@id']}>
                                <SupplyWidget supply={supply} />
                            </Grid>
                        ))}
                </Grid>

                {fabActions && <FabButton fabActions={fabActions} ariaLabel="fab-button" open={false} direction="up" />}
                <BottomBar />
                {supplyAdd && (
                    <ModalAddSupply
                        onSave={(): void => setSupplyAdd(false)}
                        onClose={(): void => setSupplyAdd(false)}
                    />
                )}
                {addOpen && (
                    <ModalAddConsumption
                        onSave={(): void => setAddOpen(false)}
                        onClose={(): void => setAddOpen(false)}
                    />
                )}
            </ContentContainer>
        </RootContainer>
    );
};
