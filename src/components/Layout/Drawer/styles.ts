import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const drawerWidth = 260;

export default makeStyles((theme: Theme) => ({
    drawerPaper: {
        minHeight: '100vh',
        height: '100%',
        overflowY: 'auto',
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));
