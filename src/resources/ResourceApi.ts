import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { normalizeUri, requestApi } from 'services/axios';
import { ApiPushItem, CollectionJsonLD, ItemJsonLD, ResourceApi } from 'typings/api';

export const DEFAULT_FETCHED_ITEMS_PER_AGE = 30;

export const createResourceApi = <
    ApiItem extends ItemJsonLD,
    ListFilter extends Record<string, any> = Record<string, any>,
>(
    resourceName: string,
): ResourceApi<ApiItem, ListFilter> => {
    const fetchPage = (
        page: number,
        itemsPerPage = DEFAULT_FETCHED_ITEMS_PER_AGE,
        filters?: ListFilter,
        options?: AxiosRequestConfig,
    ): AxiosPromise<CollectionJsonLD<ApiItem>> =>
        requestApi<CollectionJsonLD<ApiItem>>({
            url: resourceName,
            params: {
                ...filters,
                page,
                perPage: itemsPerPage,
            },
            ...options,
        });

    const fetchById = (id: string, options?: AxiosRequestConfig): AxiosPromise<ApiItem> =>
        requestApi<ApiItem>({
            url: normalizeUri(resourceName, id),
            ...options,
        });

    const create = (data: ApiPushItem<ApiItem>): AxiosPromise<ApiItem> =>
        requestApi<ApiItem>({
            url: resourceName,
            method: 'POST',
            data,
        });

    const update = (id: string, data: ApiPushItem<ApiItem>): AxiosPromise<ApiItem> =>
        requestApi<ApiItem>({
            url: normalizeUri(resourceName, id),
            method: 'PUT',
            data,
        });

    const remove = (id: string): AxiosPromise<ApiItem> =>
        requestApi<ApiItem>({
            url: normalizeUri(resourceName, id),
            method: 'DELETE',
        });

    return { fetchPage, fetchById, create, update, remove, apiKey: resourceName };
};
