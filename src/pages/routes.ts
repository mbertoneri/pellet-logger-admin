import AuthenticatedLayout from 'components/Security/AuthenticatedLayout';
import { connectRoutes } from 'pages/user/routes';
import resources from 'resources';
import { kebabize } from 'services/string';
import { ResourcePaths, RouteWithLayout } from 'typings/shared';
import { paths as DashboardPaths, routes as DashboardRoutes } from './dashboard/routes';

const resourceKeys = Object.keys(resources) as Array<keyof typeof resources>;

export const paths = resourceKeys.reduce((reduced, key) => {
    reduced[key] = resources[key].paths;

    return reduced;
}, {} as Record<keyof typeof resources | 'dashboard', ResourcePaths | Record<string, string>>);
paths.dashboard = DashboardPaths;

export const routes = [
    ...connectRoutes,
    ...DashboardRoutes,
    ...resourceKeys.map((key) => ({
        exact: false,
        path: `/${kebabize(resources[key].name)}`,
        component: resources[key].component,
        layout: AuthenticatedLayout,
    })),
] as RouteWithLayout[];
