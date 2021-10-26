import { Container } from '@material-ui/core';
import Snackbar from 'components/Snackbar';
import { routes } from 'pages/routes';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import './services/i18n';

const App: React.FC = () => {
    const queryClient = new QueryClient();
    queryClient.setDefaultOptions({
        queries: { refetchOnWindowFocus: false, staleTime: 60 * 60 * 1000, cacheTime: 60 * 60 * 1000 },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
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
                        {/*<Redirect to={paths.dashboard.DASHBOARD_INDEX} />*/}
                    </Switch>
                </Container>
                <div>bla</div>
            </QueryClientProvider>
        </>
    );
};

export default App;
