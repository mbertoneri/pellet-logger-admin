import { LocalFireDepartment as StroveIcon } from '@mui/icons-material';
import DashBoardIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { AccountMenu } from 'components/Layout/AppBar/AccountMenu';
import { paths } from 'pages/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const BottomBar: React.FC = () => {
    const { t } = useTranslation('layout');
    const history = useHistory();
    const [value, setValue] = React.useState(history.location.pathname);

    //Link component:https://stackoverflow.com/questions/64351827/material-ui-bottomnavigation-does-not-fill-the-width
    //ou
    //history.push(`/${newValue}`);

    return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue): void => {
                        console.log(newValue);
                        setValue(newValue);
                        history.push(`${newValue}`);
                    }}
                >
                    <BottomNavigationAction
                        label={t('layout:bottom_bar:dashboard')}
                        icon={<DashBoardIcon />}
                        value={paths.dashboard.DASHBOARD_INDEX}
                    />
                    <BottomNavigationAction
                        label={t('layout:bottom_bar:strove')}
                        icon={<StroveIcon />}
                        value={paths.stove.STOVE}
                    />
                    <BottomNavigationAction
                        label={t('layout:bottom_bar:settings')}
                        icon={<SettingsIcon />}
                        value={'pathToSettings'}
                    />
                    <BottomNavigationAction
                        label={t('layout:bottom_bar:settings')}
                        icon={<SettingsIcon />}
                        component={AccountMenu}
                        value={'pathToAccount'}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};
