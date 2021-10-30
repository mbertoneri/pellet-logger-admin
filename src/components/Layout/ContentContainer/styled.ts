import { Theme } from '@mui/material';
import { drawerWidth } from 'components/Layout/Drawer/styles';
import styled from 'styled-components';

type MainProps = {
    readonly withoutDrawer: boolean;
    readonly drawerOpened: boolean;
};

export const Main = styled.main<MainProps>`
    ${({ theme, withoutDrawer, drawerOpened }: MainProps & { theme: Theme }): string => {
        let paddingLeft = +theme.spacing(2);
        let responsivePaddingLeft = +theme.spacing(2);
        let addedToMinWith = 0;
        if (!withoutDrawer) {
            if (drawerOpened) {
                paddingLeft = responsivePaddingLeft = addedToMinWith = +theme.spacing(2) + drawerWidth;
            } else {
                paddingLeft = +theme.spacing(9);
                responsivePaddingLeft = +theme.spacing(11);
            }
        }
        return `
        flex-grow: 1;
        min-height: calc(100vh - 64px - ${2 * +theme.spacing(2)}px);
        padding: calc(64px + ${theme.spacing(2)}px) ${theme.spacing(2)}px 80px;
        overflow: auto;
        width: 100vw;
        min-width: calc(100% + ${addedToMinWith}px);
        transition: ${theme.transitions.create(['padding-left', 'min-width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })};
        padding-left: ${paddingLeft}px;
        ${theme.breakpoints.up('sm')} {
            padding-left: ${responsivePaddingLeft}px;
        };
        ${theme.breakpoints.up('md')} {
            min-width: 100%;
        }`;
    }}
`;
