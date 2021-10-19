import { AxiosPromise } from 'axios';
import { Locales } from 'typings/enums';

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
