import CottageIcon from '@mui/icons-material/Cottage';
import { Avatar, CardContent, CardHeader } from '@mui/material';
import FullHeightCard from 'components/DataDisplay/Card/Card/FullHeightCard';
import { useEntityFetch } from 'hooks/useCrudQueries';
import React from 'react';
import { useTranslation } from 'react-i18next';
import pelletBrandResource from 'resources/pelletBrand/index';
import { formatDate } from 'services/date';
import { SupplyApiItem } from 'typings/api';
import { Widget } from './Widget';

type Props = {
    supply: SupplyApiItem;
};

export const SupplyWidget: React.FC<Props> = ({ supply }) => {
    const { t } = useTranslation('supply');
    const { data: pelletBrand } = useEntityFetch(pelletBrandResource, supply.pelletBrand);

    return (
        <FullHeightCard elevation={2}>
            <CardHeader
                avatar={
                    <Avatar>
                        <CottageIcon />
                    </Avatar>
                }
                title={pelletBrand ? pelletBrand.title : t('supply:widget.title')}
                subheader={`${t('supply:widget.purchased_at')} ${formatDate(supply.purchasedAt)}`}
            />
            <CardContent>
                <Widget supply={supply} />
            </CardContent>
        </FullHeightCard>
    );
};
