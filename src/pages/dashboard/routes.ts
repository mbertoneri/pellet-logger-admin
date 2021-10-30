import { lazy } from 'react';

import { RouteWithLayout } from 'typings/shared';
import AuthenticatedLayout from 'components/Security/AuthenticatedLayout';

const Dashboard = lazy(() => import('./index'));

export const paths = {
    DASHBOARD_INDEX: '/',
};

export const routes: RouteWithLayout[] = [
    {
        exact: true,
        path: paths.DASHBOARD_INDEX,
        component: Dashboard,
        layout: AuthenticatedLayout,
    },
];
