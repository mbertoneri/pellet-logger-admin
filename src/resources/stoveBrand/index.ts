import { paths, routes } from 'pages/user/routes';
import api from 'resources/stoveBrand/api';
import selectors from 'store/stoveBrand/selectors';
import { actions } from 'store/stoveBrand/slice';
import { StoveBrandApiItem } from 'typings/api';
import { Resource } from 'typings/shared';

const resource: Resource<StoveBrandApiItem, typeof api> = {
    name: 'stove',
    translationKey: 'stove',
    api,
    selectors,
    paths,
    actions,
    routes,
};
export default resource;
