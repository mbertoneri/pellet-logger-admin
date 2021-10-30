import {
    AppBar as MUIAppBar,
    IconButton,
    Toolbar as MaterialToolbar,
    ToolbarProps as MUIToolbarProps,
} from '@mui/material';
import { drawerWidth } from 'components/Layout/Drawer/styles';
import SCStyled from 'styled-components';
import { Theme, styled } from '@mui/material/styles';

type ToggleProps = {
    $withDrawer: boolean;
    $drawerOpened: boolean;
};

type ToolbarProps = Omit<MUIToolbarProps, 'color'> & {
    color?: string;
};

export const AppBar = SCStyled(MUIAppBar)<ToggleProps>`
    ${({ theme, $withDrawer: withDrawer, $drawerOpened: drawerOpened }: ToggleProps & { theme: Theme }): string => `
            z-index: ${theme.zIndex.drawer + 1};
            margin-left: ${withDrawer && drawerOpened ? `${drawerWidth}px` : '0'};
            width: ${withDrawer && drawerOpened ? `calc(100% - ${drawerWidth}px)` : '100%'};
            transition: ${theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })};
        `}
`;

export const Toolbar = styled(({ color: _, ...toolbarProps }: ToolbarProps) => <MaterialToolbar {...toolbarProps} />)(
    ({ theme, color }) => ({
        paddingRight: theme.spacing(2),
        backgroundColor: color || theme.palette.primary.main,
        color: color ? theme.palette.getContrastText(color) : theme.palette.common.white,
    }),
);

export const DrawerToggle = SCStyled(IconButton)<ToggleProps>`
    ${({ theme, $withDrawer: withDrawer, $drawerOpened: drawerOpened }: ToggleProps & { theme: Theme }): string => `
            margin-right: ${theme.spacing(3)}px;
            display: ${!withDrawer || drawerOpened ? 'none' : 'flex'};
        `}
`;

export const AppBarButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

export const Title = styled('div')({
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});
