import { routes } from 'pages/pelletBrand/routes';
import api from 'resources/pelletBrand/api';
import selectors from 'store/pelletBrand/selectors';
import { actions } from 'store/pelletBrand/slice';
import { PelletBrandApiItem } from 'typings/api';
import { Resource } from 'typings/shared';

const resource: Resource<PelletBrandApiItem, typeof api> = {
    name: 'pelletBrand',
    translationKey: 'pelletBrand',
    api,
    selectors,
    paths: {},
    actions,
    routes,
};
export default resource;
