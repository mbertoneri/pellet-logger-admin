import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { QueryFunction, QueryKey } from 'react-query/types/core/types';
import { UseQueryOptions, UseQueryResult } from 'react-query/types/react/types';
import { getLastPageFromData, getNextPageFromData, getPreviousPageFromData } from 'services/axios';
import { CollectionJsonLD } from 'typings/api';

export type QueryCollectionReturnType<TData extends CollectionJsonLD<any>, TError = unknown> = Omit<
    UseQueryResult<TData, TError>,
    'data'
> & {
    data?: TData['hydra:member'];
    totalItems: TData['hydra:totalItems'];
    hydraView?: TData['hydra:view'];
    lastPage: number;
    nextPage: number;
    previousPage: number;
};

export const useQueryCollection = <TEntity, TError = unknown, TQueryKey extends QueryKey = QueryKey>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<AxiosResponse<CollectionJsonLD<TEntity>>, TQueryKey>,
    options?: Omit<
        UseQueryOptions<AxiosResponse<CollectionJsonLD<TEntity>>, TError, CollectionJsonLD<TEntity>, TQueryKey>,
        'queryKey' | 'queryFn'
    >,
): QueryCollectionReturnType<CollectionJsonLD<TEntity>, TError> => {
    const { data, ...rest } = useQuery<
        AxiosResponse<CollectionJsonLD<TEntity>>,
        TError,
        CollectionJsonLD<TEntity>,
        TQueryKey
    >(queryKey, queryFn, {
        ...options,
        select: ({ data }) => data,
    });

    return {
        ...rest,
        data: data?.['hydra:member'],
        totalItems: data?.['hydra:totalItems'] || 0,
        hydraView: data?.['hydra:view'],
        lastPage: data ? getLastPageFromData(data) : 1,
        nextPage: data ? getNextPageFromData(data) : 1,
        previousPage: data ? getPreviousPageFromData(data) : 1,
    };
};
