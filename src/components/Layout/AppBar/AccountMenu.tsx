import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { AccountBox, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { paths } from 'pages/routes';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'store';
import { actions } from 'store/user/slice';
import { OrNull } from 'typings/shared';

export const AccountMenu: React.FC = () => {
    const [profileMenuAnchor, setProfileMenuAnchor] = useState<OrNull<HTMLElement>>(null);
    const { t } = useTranslation('layout');
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();

    const logout = (): void => {
        dispatch(actions.disconnect());
        setProfileMenuAnchor(null);
        history.push(paths.user.USER_LOGIN);
    };

    return (
        <>
            <IconButton
                edge="end"
                aria-label="Account"
                aria-controls="toolbar-account"
                aria-haspopup="true"
                onClick={(event: React.MouseEvent<HTMLElement>): void => setProfileMenuAnchor(event.currentTarget)}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={profileMenuAnchor}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="toolbar-account"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(profileMenuAnchor)}
                onClose={(): void => setProfileMenuAnchor(null)}
            >
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>{t('layout:profile.logout')}</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={(): void => {
                        setProfileMenuAnchor(null);
                    }}
                >
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <ListItemText>{t('layout:profile.my_account')}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};
