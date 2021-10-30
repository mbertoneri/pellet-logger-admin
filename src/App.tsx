/* eslint-disable @typescript-eslint/naming-convention */
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Snackbar from 'components/Snackbar';
import { paths, routes } from 'pages/routes';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import './App.css';
import './services/i18n';
import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
    type DefaultTheme = Theme;
}

const App: React.FC = () => {
    const queryClient = new QueryClient();
    queryClient.setDefaultOptions({
        queries: { refetchOnWindowFocus: false, staleTime: 60 * 60 * 1000, cacheTime: 60 * 60 * 1000 },
    });

    const defaultTheme = createTheme();
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#34c4ee',
                main: '#1909f1',
                dark: '#001580',
                contrastText: '#fff',
            },
            secondary: {
                light: '#6effff',
                main: '#00e5ff',
                dark: '#00b2cc',
                contrastText: '#000',
            },
        },
        mixins: defaultTheme.mixins,
        shadows: defaultTheme.shadows,
        transitions: defaultTheme.transitions,
        typography: defaultTheme.typography,
        zIndex: defaultTheme.zIndex,

        // components: {
        //     MUIDataTableBodyRow: {},
        // },
        // overrides: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // MUIDataTableBodyRow: {
        //     responsiveStacked: {
        //         [defaultTheme.breakpoints.down('sm')]: {
        //             borderTop: 'solid 2px rgba(255, 255, 255, 1)',
        //             borderBottom: 'solid 2px rgba(255, 255, 255, 1)',
        //         },
        //     },
        //     responsiveSimple: {
        //         [defaultTheme.breakpoints.down('xs')]: {
        //             borderTop: 'solid 2px rgba(255, 255, 255, 1)',
        //             borderBottom: 'solid 2px rgba(255, 255, 255, 1)',
        //         },
        //     },
        // },
        // MuiCssBaseline: {
        //     '@global': {
        //         '*::-webkit-scrollbar': {
        //             width: '8px',
        //             height: '8px',
        //         },
        //         '*::-webkit-scrollbar-track': {
        //             background: 'inherit',
        //             boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
        //         },
        //         '*::-webkit-scrollbar-thumb': {
        //             backgroundColor: 'rgba(219, 171, 255, 0.3)',
        //             borderRadius: '20px',
        //             border: 'rgba(219, 171, 255, 0.3)',
        //         },
        //         '*::-webkit-scrollbar-corner': {
        //             background: 'inherit',
        //         },
        //     },
        // },
        // },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ThemeProvider theme={theme}>
                    <SCThemeProvider theme={theme}>
                        <CssBaseline />
                        <Container
                            maxWidth={false}
                            disableGutters
                            style={{
                                display: 'flex',
                                width: '100vw',
                                height: '100%',
                                maxWidth: '100%',
                                minHeight: '100vh',
                            }}
                        >
                            <Snackbar />
                            <Switch>
                                {routes.map(({ exact, path, component: Component, layout: Layout }, index) => {
                                    console.log({ exact, index, path });
                                    return (
                                        <Route
                                            key={index}
                                            exact={exact}
                                            path={path}
                                            render={(props): React.ReactElement => (
                                                <Layout>
                                                    <Component {...props} />
                                                </Layout>
                                            )}
                                        />
                                    );
                                })}
                                <Redirect to={paths.dashboard.DASHBOARD_INDEX} />
                            </Switch>
                        </Container>
                        <div>bla</div>
                    </SCThemeProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
