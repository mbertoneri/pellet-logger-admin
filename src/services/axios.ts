import Axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getSwitchUser, getToken } from 'services/security';
import { store } from 'store';
import { failure, init, success } from 'store/request/slice';
import { actions } from 'store/user/slice';
import { CollectionJsonLD } from 'typings/api';
import { RequestPayload } from 'typings/payloads';
import { OrNull } from 'typings/shared';
import { flash } from './bus';
import i18next from './i18n';
import { slugifyApiError } from './string';

interface AxiosPromiseWithCancel<T> extends AxiosPromise<T> {
    cancel: () => void;
}

i18next.loadNamespaces(['schema', 'errors']);

const normalizeUri = (prefix: string, id?: OrNull<string>): string =>
    id && id.length ? `/${prefix.replace('/', '')}/${id.replace(`/${prefix.replace('/', '')}/`, '')}` : '';

const iriToId = (prefix: string, id: string): string => id.replace(`/${prefix.replace('/', '')}/`, '');

const getLastPageFromData = (data: CollectionJsonLD<any>): number => {
    if (data['hydra:view'] && data['hydra:view']['hydra:last']) {
        // noinspection RegExpUnnecessaryNonCapturingGroup
        const matches = data['hydra:view']['hydra:last'].match(/(?:page=(?<page>\d+))/);
        if (matches) {
            return parseInt(matches?.groups?.['page'] ?? '1', 10);
        }
    }

    return 1;
};

const getNextPageFromData = (data: CollectionJsonLD<any>): number => {
    if (data['hydra:view'] && data['hydra:view']['hydra:next']) {
        // noinspection RegExpUnnecessaryNonCapturingGroup
        const matches = data['hydra:view']['hydra:next'].match(/(?:page=(?<page>\d+))/);
        if (matches) {
            return parseInt(matches?.groups?.['page'] ?? '1', 10);
        }
    }

    return 1;
};

const getPreviousPageFromData = (data: CollectionJsonLD<any>): number => {
    if (data['hydra:view'] && data['hydra:view']['hydra:previous']) {
        // noinspection RegExpUnnecessaryNonCapturingGroup
        const matches = data['hydra:view']['hydra:previous'].match(/(?:page=(?<page>\d+))/);
        if (matches) {
            return parseInt(matches?.groups?.['page'] ?? '1', 10);
        }
    }

    return 1;
};

const axios = Axios.create({
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
});

axios.interceptors.request.use((request) => {
    const payload: RequestPayload = {
        isUpdate: false,
    };
    if (
        request.method?.toUpperCase() === 'POST' ||
        request.method?.toUpperCase() === 'PATCH' ||
        request.method?.toUpperCase() === 'PUT' ||
        request.method?.toUpperCase() === 'DELETE'
    ) {
        payload.isUpdate = true;
    }
    store.dispatch(init(payload));

    return request;
});

axios.interceptors.response.use(
    (response) => {
        store.dispatch(success());

        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            if (400 === error.response.status || 422 === error.response.status) {
                const message = error.response?.data?.['hydra:title'] ?? null;
                const description = error.response?.data?.['hydra:description'] ?? null;
                store.dispatch(
                    failure({
                        message: message ? i18next.t(`schema:api.${slugifyApiError(message)}`) : 'Unknown 400 message',
                        description: description ? i18next.t(`schema:api.${slugifyApiError(description)}`) : null,
                        violations: error.response?.data?.violations ?? null,
                    }),
                );
            } else if (401 === error.response.status) {
                store.dispatch(failure({ message: 'Authentication error', description: null, violations: null }));
                store.dispatch(actions.disconnect());
            } else if (405 === error.response.status) {
                const message = error.response?.data?.['hydra:title'] ?? null;
                const description = error.response?.data?.['hydra:description'] ?? null;
                store.dispatch(
                    failure({
                        message: message ? i18next.t(`schema:api.${slugifyApiError(message)}`) : 'Unknown 405 message',
                        description: description ? i18next.t(`schema:api.${slugifyApiError(description)}`) : null,
                        violations: [],
                    }),
                );
                if (message && message.length > 0) {
                    flash({ message: i18next.t(`schema:api.${slugifyApiError(description)}`), type: 'error' });
                }
            } else if (404 === error.response.status) {
                throw error;
            } else {
                store.dispatch(
                    failure({
                        message: `Server error ${error.response.status}`,
                        description: error.response.data,
                        violations: null,
                    }),
                );
            }
        }
        store.dispatch(
            failure({
                message: `Unknown error`,
                description: JSON.stringify(error),
                violations: null,
            }),
        );

        throw error;
    },
);

type RequestOptions = AxiosRequestConfig & {
    secure?: boolean;
};

const REQUEST_DEFAULT_HEADERS: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/ld+json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
};

const REQUEST_DEFAULT_OPTIONS: RequestOptions = {
    method: 'GET',
    secure: true,
    headers: {},
};

const requestApi = <Entity = unknown>(options: RequestOptions): AxiosPromiseWithCancel<Entity> => {
    const cancelToken = Axios.CancelToken.source();
    const token = getToken();
    const switchUser = getSwitchUser();
    options = {
        ...REQUEST_DEFAULT_OPTIONS,
        ...options,
        cancelToken: cancelToken.token,
        url: options.url?.replace('//', '/'),
        headers: { ...REQUEST_DEFAULT_HEADERS, ...options.headers },
        paramsSerializer: (params): string => qs.stringify(params),
    };
    if (options.secure && token && token.length > 0) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (switchUser) {
        options.headers['_switch-user'] = switchUser;
    }

    if (typeof options.data === 'object') {
        const data = { ...options.data };
        Object.keys(data).forEach((key) => {
            data[key] = data[key] === '' ? null : data[key];
        });

        options.data = data;
    }

    const promise = axios.request(options) as AxiosPromiseWithCancel<Entity>;
    promise.cancel = (): void => {
        cancelToken.cancel();
    };

    return promise;
};

export { axios, requestApi, normalizeUri, iriToId, getLastPageFromData, getNextPageFromData, getPreviousPageFromData };
