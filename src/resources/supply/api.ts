import { AxiosPromise } from 'axios';
import { createResourceApi, DEFAULT_FETCHED_ITEMS_PER_AGE } from 'resources/ResourceApi';
import { normalizeUri, requestApi } from 'services/axios';
import { CollectionJsonLD, ConsumptionApiItem, SupplyApiItem } from 'typings/api';

const consumptions = (
    supply: string,
    page: number,
    itemsPerPage = DEFAULT_FETCHED_ITEMS_PER_AGE,
): AxiosPromise<CollectionJsonLD<ConsumptionApiItem>> => {
    const queryParameters = {
        page,
        perPage: itemsPerPage,
    };

    return requestApi({
        url: `${normalizeUri('supplies', supply)}/consumptions`,
        params: queryParameters,
    });
};

export default { ...createResourceApi<SupplyApiItem>('supplies'), consumptions };
