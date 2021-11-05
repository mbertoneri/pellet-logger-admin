import { Paper, styled } from '@mui/material';

export const DrawerContent = styled(Paper)(({ theme }) => ({
    width: `min(600px, 100%)`,
    maxWidth: `min(600px, 100%)`,
    padding: theme.spacing(2),
}));
