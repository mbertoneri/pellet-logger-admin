import { paths, routes } from 'pages/user/routes';
import { lazy } from 'react';
import api from 'resources/user/api';
import selectors from 'store/user/selectors';
import { actions } from 'store/user/slice';
import { UserApiItem } from 'typings/api';
import { Resource } from 'typings/shared';

const resource: Resource<UserApiItem, typeof api> = {
    name: 'user',
    translationKey: 'user',
    api,
    selectors,
    paths,
    actions,
    routes,
    component: lazy(() => import('pages/user')),
};
export default resource;
