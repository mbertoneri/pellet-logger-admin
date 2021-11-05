import { AxiosPromise } from 'axios';
import React, { FC, LazyExoticComponent } from 'react';
import { Locales, Roles } from 'typings/enums';
import { ResourceListSelectors, ResourceSlice } from 'typings/state';
import { ResourceApi } from './api';

type Levels = 'success' | 'info' | 'warning' | 'error';

export type OrNull<Type> = Type | null;
export type Optional<Type> = OrNull<Type> | undefined;

export type JWTToken = OrNull<string>;
export type SwitchUser = OrNull<string>;

export type Item = {
    '@id': string;
    id: string;
};

export type Translations<TEntity> = {
    [key in Locales]: TEntity;
};

export type Translatable<TEntity> = {
    translations: Translations<TEntity>;
};

export type OptionalTranslatable<TEntity> = {
    translations?: Translations<TEntity>;
};

export type Flash = {
    message: string;
    type: Levels;
};

export type DownloadEvent<T> = {
    promise: () => AxiosPromise<T>;
    contentType: string;
    name: string;
};

export type Violation = {
    propertyPath: string;
    message: string;
};

export type Route = {
    exact: boolean;
    path: string;
    component: FC<any>;
    roles?: Roles | Array<Roles>;
};

export type RouteWithLayout = Route & {
    layout: FC<any>;
};

export type RouteCollection = Record<string, Route> & {
    list?: Route;
    add?: Route;
    edit?: Route;
    show?: Route;
};

export type ResourcePaths = Record<string, string> & {
    LIST?: string;
    EDIT?: string;
    SHOW?: string;
    ADD?: string;
};

export type Resource<TEntity extends Item, ApiType extends ResourceApi<TEntity> = ResourceApi<TEntity>> = {
    name: string;
    paths: ResourcePaths;
    translationKey: string;
    api: ApiType;
    selectors: ResourceListSelectors;
    actions: ResourceSlice;
    routes?: RouteCollection;
    component?: LazyExoticComponent<FC<any>>;
};

export type ValidationError = {
    message?: string;
    values?: { [key: string]: any };
};

export type FabActionType = {
    onClick: () => unknown;
    key: string;
    tooltip: string;
    roles: Array<Roles>;
    icon: React.ReactNode;
};
