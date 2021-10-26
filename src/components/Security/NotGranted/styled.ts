import { styled, Typography } from '@material-ui/core';

export const Container = styled('main')({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
});

export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey.A100,
    margin: theme.spacing(2),
}));
