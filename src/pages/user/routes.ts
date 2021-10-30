import PublicLayout from 'components/Security/PublicLayout';
import { lazy } from 'react';
import { Roles } from 'typings/enums';
import { RouteCollection, RouteWithLayout } from 'typings/shared';

const Login = lazy(() => import('./Login'));
const UserEditPage = lazy(() => import('./Login'));

export const paths = {
    USER_LOGIN: '/login',
    EDIT: '/user/:id/edit',
};

export const connectRoutes: Array<RouteWithLayout> = [
    {
        exact: true,
        path: paths.USER_LOGIN,
        component: Login,
        layout: PublicLayout,
    },
];

export const routes: RouteCollection = {
    edit: {
        exact: true,
        path: paths.EDIT,
        component: UserEditPage,
        roles: [Roles.BASE_USER],
    },
};
