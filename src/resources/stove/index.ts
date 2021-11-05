import { paths, routes } from 'pages/user/routes';
import api from 'resources/stove/api';
import selectors from 'store/stove/selectors';
import { actions } from 'store/stove/slice';
import { StoveApiItem } from 'typings/api';
import { Resource } from 'typings/shared';

const resource: Resource<StoveApiItem, typeof api> = {
    name: 'stove',
    translationKey: 'stove',
    api,
    selectors,
    paths,
    actions,
    routes,
};
export default resource;
