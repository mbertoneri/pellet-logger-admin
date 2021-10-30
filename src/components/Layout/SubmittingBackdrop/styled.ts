import { styled, Backdrop as MUIBackdrop } from '@mui/material';

export const Backdrop = styled(MUIBackdrop)(({ theme }) => ({
    zIndex: theme.zIndex.modal + 1,
    color: theme.palette.text.primary,
}));
