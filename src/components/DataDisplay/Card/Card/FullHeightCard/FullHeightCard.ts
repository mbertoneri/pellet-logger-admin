import { Card, styled } from '@mui/material';

type Props = {
    overflowable?: Record<'overflowable', boolean>;
};

export const FullHeightCard = styled(Card)<Props>(({ overflowable }) => ({
    height: '100%',
    overflow: overflowable ? 'visible' : 'hidden',
}));
