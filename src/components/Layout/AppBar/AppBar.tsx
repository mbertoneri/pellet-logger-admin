import { Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AccountMenu } from 'components/Layout/AppBar/AccountMenu';
import { AppBar as StyledAppBar, AppBarButton, DrawerToggle, Title, Toolbar } from 'components/Layout/AppBar/styled';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { layoutSelector } from 'store/layout/selectors';
import { Optional } from 'typings/shared';

type Props = {
    title?: string | ReactElement;
    subtitle?: string | ReactElement;
    handleBack?: () => unknown;
    withDrawer: boolean;
    withAccount: boolean;
    toggleDrawer: () => void;
    menus?: Optional<ReactElement[]>;
    handleClose?: () => unknown;
    color?: string;
};

const AppBar: React.FC<Props> = ({
    title,
    subtitle,
    withDrawer,
    withAccount,
    toggleDrawer,
    handleBack,
    menus,
    handleClose,
    color,
}) => {
    const { t } = useTranslation('layout');
    const open = useSelector(layoutSelector.selectDrawerOpen);
    const history = useHistory();

    const onBack = (): void => {
        if ((history.location?.state as any)?.back) {
            history.goBack();
        } else {
            handleBack && handleBack();
        }
    };

    return (
        <StyledAppBar position="fixed" $withDrawer={withDrawer} $drawerOpened={open}>
            <Toolbar color={color}>
                <DrawerToggle
                    edge="start"
                    color="inherit"
                    arial-label={t('layout:drawer.open')}
                    onClick={toggleDrawer}
                    $withDrawer={withDrawer}
                    $drawerOpened={open}
                >
                    <MenuIcon />
                </DrawerToggle>
                {handleBack && (
                    <AppBarButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
                        <ArrowBackIcon />
                    </AppBarButton>
                )}
                {handleClose && (
                    <AppBarButton edge="start" color="inherit" aria-label="back" onClick={handleClose}>
                        <CloseIcon />
                    </AppBarButton>
                )}
                <Title>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        {title || 'Pellet logger'}
                    </Typography>
                    <Typography variant="subtitle1" color="inherit" noWrap>
                        {subtitle}
                    </Typography>
                </Title>
                {menus}
                {withAccount && <AccountMenu />}
            </Toolbar>
        </StyledAppBar>
    );
};

export { AppBar };
