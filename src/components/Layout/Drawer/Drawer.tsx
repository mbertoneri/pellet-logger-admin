import { Divider, Drawer as MuiDrawer, List, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import clsx from 'clsx';
import { Back } from 'components/Layout/Drawer/Back';
import { ListItemLink } from 'components/Layout/Drawer/ListItemLink';
import createStyles from 'components/Layout/Drawer/styles';
import { paths } from 'pages/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { layoutSelector } from 'store/layout/selectors';

type Props = {
    toggleDrawer: () => void;
    selectedElement?: string;
};

export const Drawer: React.FC<Props> = ({ selectedElement, toggleDrawer }) => {
    const open = useSelector(layoutSelector.selectDrawerOpen);
    const { t } = useTranslation(['layout']);
    const classes = createStyles();

    return (
        <MuiDrawer
            variant="permanent"
            open={open}
            classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
        >
            <Back toggleDrawer={toggleDrawer} />
            <Divider />
            <List>
                <ListItemLink
                    href={paths.dashboard.DASHBOARD_INDEX}
                    toggleDrawer={toggleDrawer}
                    selected={selectedElement === 'dashboard'}
                >
                    <Tooltip title={t('layout:drawer.items.dashboard') as string}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={t('layout:drawer.items.dashboard')} />
                </ListItemLink>
            </List>
        </MuiDrawer>
    );
};
