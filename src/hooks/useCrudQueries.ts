import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Query, useMutation, UseMutationResult, useQuery, useQueryClient } from 'react-query';
import { UseQueryResult } from 'react-query/types/react/types';
import { useHistory, useParams } from 'react-router-dom';
import { normalizeUri } from 'services/axios';
import { flash } from 'services/bus';
import { ApiPushItem } from 'typings/api';
import { Item, OrNull, Resource } from 'typings/shared';

type EditMutations<TEntity> = {
    editMutation: UseMutationResult<TEntity, unknown, ApiPushItem<TEntity>, unknown>;
    deleteMutation: UseMutationResult<AxiosResponse<TEntity>, unknown, void, unknown>;
};

type ResourceQueryType =
    | string
    | readonly [string, undefined | { currentPage?: number; id?: string; linkedId?: string }];
export type QueryType = Query<unknown, unknown, unknown, ResourceQueryType>;

export const invalidateAllPages = (key: string, query: QueryType): boolean =>
    query.queryKey[0] === key && 'object' === typeof query.queryKey[1] && undefined !== query.queryKey[1]?.currentPage;

export const invalidateId = (key: string, id: string, query: QueryType): boolean =>
    query.queryKey[0] === key && 'object' === typeof query.queryKey[1] && id === query.queryKey[1]?.id;

export const invalidateLinkedToId = (id: string, query: QueryType): boolean =>
    'object' === typeof query.queryKey[1] && id === query.queryKey[1]?.linkedId;

export const invalidateLinkedToIdWithKey = (key: string, id: string, query: QueryType): boolean =>
    query.queryKey[0] === key && 'object' === typeof query.queryKey[1] && id === query.queryKey[1]?.linkedId;

export const useAddMutation = <TEntity extends Item>(
    resource: Resource<TEntity>,
    redirect = true,
): UseMutationResult<TEntity, unknown, ApiPushItem<TEntity>, unknown> => {
    const history = useHistory();
    const client = useQueryClient();

    return useMutation((data: ApiPushItem<TEntity>) => resource.api.create(data).then((response) => response.data), {
        mutationKey: resource.api.apiKey,
        onSuccess: (entity) => {
            client.setQueryData([resource.api.apiKey, { id: entity['@id'] }], entity);
            client
                .invalidateQueries({
                    predicate: (query) => invalidateAllPages(resource.api.apiKey, query as QueryType),
                })
                .then(() => {
                    flash({ message: `${resource.translationKey}:add.submit_success`, type: 'success' });
                    if (redirect) {
                        if (resource.paths.SHOW) {
                            history.push(resource.paths.SHOW.replace(':id', entity.id));
                        } else {
                            if (resource.paths.EDIT) {
                                history.push(resource.paths.EDIT.replace(':id', entity.id));
                            }
                        }
                    }
                });
        },
    });
};

export const useEntityFetch = <TEntity extends Item>(
    resource: Resource<TEntity>,
    forcedIri: OrNull<string> | false = false,
    options?: AxiosRequestConfig,
): UseQueryResult<TEntity | null> => {
    const { id } = useParams<{ id: string }>();

    const iri = normalizeUri(resource.api.apiKey, false === forcedIri ? id : forcedIri);

    return useQuery(
        [resource.api.apiKey, { id: iri }],
        () =>
            resource.api
                .fetchById(iri, options)
                .then((response) => response.data)
                .catch(() => null),
        {
            enabled: 0 < iri.length,
        },
    );
};

export const useEditMutations = <TEntity extends Item>(resource: Resource<TEntity>): EditMutations<TEntity> => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const iri = normalizeUri(resource.api.apiKey, id);
    const client = useQueryClient();

    const editMutation = useMutation<TEntity, unknown, ApiPushItem<TEntity>>(
        (data: ApiPushItem<TEntity>) => resource.api.update(iri, data).then((response) => response.data),
        {
            mutationKey: [resource.api.apiKey, iri],
            onSuccess: async (entity: TEntity) => {
                client.setQueryData([resource.api.apiKey, { id: entity['@id'] }], entity);
                await client.invalidateQueries({
                    predicate: (query) => invalidateAllPages(resource.api.apiKey, query as QueryType),
                });

                await client.invalidateQueries({
                    predicate: (query) => invalidateLinkedToId(iri, query as QueryType),
                });
                flash({ message: `${resource.translationKey}:edit.submit_success`, type: 'success' });
            },
        },
    );

    const deleteMutation = useMutation(() => resource.api.remove(iri), {
        mutationKey: [resource.api.apiKey, iri],
        onSuccess: async () => {
            flash({ message: `${resource.translationKey}:edit.delete_success`, type: 'success' });
            resource.paths.LIST && history.push(resource.paths.LIST);
            await client.invalidateQueries({
                predicate: (query) => invalidateAllPages(resource.api.apiKey, query as QueryType),
            });
            await client.invalidateQueries({
                predicate: (query) => invalidateId(resource.api.apiKey, iri, query as QueryType),
                refetchActive: false,
            });
        },
    });

    return {
        editMutation,
        deleteMutation,
    };
};
