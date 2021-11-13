import { Add as AddIcon, LocalFireDepartment as StroveIcon } from '@mui/icons-material';
import { Divider, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import FabButton from 'components/button/FabButton';
import ModalAdd from 'components/Entities/Stove/ModalAdd';
import BottomBar from 'components/Layout/BottomBar';
import ContentContainer from 'components/Layout/ContentContainer';
import RootContainer from 'components/Layout/RootContainer';
import { useAllPagesQuery } from 'hooks/useAllPagesQuery';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import stoveResource from 'resources/stove';
import brandResource from 'resources/stoveBrand';
import { userStoves } from 'resources/userStove/api';
import { formatDate } from 'services/date';
import { UserStoveApiItem } from 'typings/api';
import { Roles } from 'typings/enums';
import { FabActionType } from 'typings/shared';

export const Stove: React.FC = () => {
    const { t } = useTranslation('stove');
    const [addOpen, setAddOpen] = useState(false);

    const { data, isLoading } = useAllPagesQuery({
        apiKey: 'user_stoves',
        apiMethod: (page, itemsPerPage) => userStoves(page, itemsPerPage),
    });

    const { data: brandData } = useAllPagesQuery({
        apiKey: brandResource.api.apiKey,
        apiMethod: brandResource.api.fetchPage,
    });

    const getBrand = (stove: UserStoveApiItem): string => {
        const brand = (brandData || []).find((currentBrand) => currentBrand['@id'] === stove.stove.stoveBrand);
        return brand ? brand.title : '';
    };

    const fabActions: Array<FabActionType> = [
        {
            onClick: (): void => setAddOpen(true),
            key: 'add',
            tooltip: t(`${stoveResource.translationKey}:fab-actions.add`),
            roles: [Roles.BASE_USER],
            icon: <AddIcon color="primary" fontSize="large" />,
        },
    ];

    return (
        <RootContainer>
            <ContentContainer>
                {isLoading && <LinearProgress />}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {data &&
                        !isLoading &&
                        data.map((stove) => (
                            <React.Fragment key={stove.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemIcon>
                                        <StroveIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={stove.stove.title}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {getBrand(stove)}
                                                </Typography>
                                                {` ${stove.purchasePrice} ${t('stove:purchased_at')} ${formatDate(
                                                    stove.purchasedAt,
                                                )}`}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                </List>
                {fabActions && <FabButton fabActions={fabActions} ariaLabel="fab-button" open={false} direction="up" />}
                <BottomBar />
                {!isLoading && addOpen && (
                    <ModalAdd
                        onSave={(): void => {
                            setAddOpen(false);
                        }}
                        onClose={(): void => setAddOpen(false)}
                    />
                )}
            </ContentContainer>
        </RootContainer>
    );
};
