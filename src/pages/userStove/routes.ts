import AuthenticatedLayout from 'components/Security/AuthenticatedLayout';
import lazyWithRetry from 'services/lazyWithRetry';
import { Roles } from 'typings/enums';
import { RouteWithLayout } from 'typings/shared';

const StoveGeneral = lazyWithRetry(() => import('./Stove'));

export const paths = {
    STOVE: '/stove',
};

export const routes: RouteWithLayout[] = [
    {
        exact: true,
        path: paths.STOVE,
        component: StoveGeneral,
        layout: AuthenticatedLayout,
        roles: [Roles.BASE_USER],
    },
];
