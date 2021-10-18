import { AxiosPromise, AxiosRequestConfig } from 'axios';

import { Item, OrNull, Violation } from './shared';

export type ApiPushItem<ApiItem> = Omit<ApiItem, '@id' | 'id'>;

export type NestedApiItem<ApiItem> = ApiPushItem<ApiItem> & {
    id?: string | number;
};

type ResourceApi<ApiItem, ListFilter extends Record<string, any> = Record<string, any>> = {
    fetchPage: (
        page: number,
        itemsPerPage?: number,
        filters?: ListFilter,
        options?: AxiosRequestConfig,
    ) => AxiosPromise<CollectionJsonLD<ApiItem>>;
    fetchById: (id: string, options?: AxiosRequestConfig) => AxiosPromise<ApiItem>;
    create: (data: ApiPushItem<ApiItem>) => AxiosPromise<ApiItem>;
    update: (id: string, data: ApiPushItem<ApiItem>) => AxiosPromise<ApiItem>;
    remove: (id: string) => AxiosPromise<ApiItem>;
    apiKey: string;
};

type HydraView = {
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next': string;
    'hydra:previous': string;
};

export type CollectionJsonLD<TEntity> = {
    '@context': string;
    '@id': string;
    '@type': 'hydra:Collection';
    'hydra:member': TEntity[];
    'hydra:totalItems': number;
    'hydra:view'?: HydraView;
};

export type ItemJsonLD = Item & {
    '@context'?: string;
    '@type'?: string;
};

export type ApiErrors = {
    message: OrNull<string>;
    description: OrNull<string>;
    violations: OrNull<Array<Violation>>;
};

export type AuthApiToken = {
    token: string;
};

export type UserApiItem = ItemJsonLD & UserResource;
