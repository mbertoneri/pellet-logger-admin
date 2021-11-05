import { styled } from '@mui/material';
import { SpeedDial } from '@mui/lab';

export const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
}));
