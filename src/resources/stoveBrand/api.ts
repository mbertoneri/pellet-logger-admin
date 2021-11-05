import { AxiosPromise } from 'axios';
import { createResourceApi, DEFAULT_FETCHED_ITEMS_PER_AGE } from 'resources/ResourceApi';
import { normalizeUri, requestApi } from 'services/axios';
import { CollectionJsonLD, StoveApiItem, StoveBrandApiItem } from 'typings/api';

const models = (
    rental: string,
    page: number,
    itemsPerPage = DEFAULT_FETCHED_ITEMS_PER_AGE,
): AxiosPromise<CollectionJsonLD<StoveApiItem>> => {
    const queryParameters = {
        page,
        perPage: itemsPerPage,
    };
    return requestApi({
        url: `${normalizeUri('stove_brands', rental)}/stoves`,
        params: queryParameters,
    });
};

export default { models, ...createResourceApi<StoveBrandApiItem>('stove_brands') };
