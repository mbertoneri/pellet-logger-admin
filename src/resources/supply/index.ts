import { routes } from 'pages/supply/routes';
import api from 'resources/supply/api';
import selectors from 'store/supply/selectors';
import { actions } from 'store/supply/slice';
import { SupplyApiItem } from 'typings/api';
import { Resource } from 'typings/shared';

const resource: Resource<SupplyApiItem, typeof api> = {
    name: 'supply',
    translationKey: 'supply',
    api,
    selectors,
    paths: {},
    actions,
    routes,
};
export default resource;
