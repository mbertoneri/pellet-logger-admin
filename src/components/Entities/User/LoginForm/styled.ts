import { Grid, styled } from '@mui/material';
import { Alert as MuiAlert } from '@mui/lab';
import MuiTextField from 'components/Form/TextField';

export const Form = styled('form')(({ theme }) => ({
    margin: theme.spacing(2),
}));

export const CenterAlignedContainer = styled(Grid)({
    textAlign: 'center',
});

export const Alert = styled(MuiAlert)(({ theme: { spacing } }) => ({
    marginBottom: spacing(1),
}));

export const TextField = styled(MuiTextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));
