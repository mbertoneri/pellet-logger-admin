import { Avatar, styled } from '@mui/material';

export const Main = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
}));

export const AvatarIcon = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(1),
}));
