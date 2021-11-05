import { useQueryCollection } from 'hooks/useQueryCollection';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ResourceApi } from 'typings/api';

type AllPagesReturn<T> = {
    isLoading: boolean;
    data: Array<T>;
};

type Params<T, ListFilter extends Record<string, any> = Record<string, any>> = {
    apiKey: string;
    apiMethod: ResourceApi<T>['fetchPage'];
    linkedId?: string;
    itemsPerPage?: number;
    filters?: ListFilter;
    enabled?: boolean;
};

export const useAllPagesQuery = <T, ListFilter extends Record<string, any> = Record<string, any>>({
    apiKey,
    apiMethod,
    linkedId,
    itemsPerPage = 30,
    filters = {} as ListFilter,
    enabled = true,
}: Params<T, ListFilter>): AllPagesReturn<T> => {
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [stateFilters, setFilters] = useState<ListFilter>(filters);
    const [allData, setAllData] = useState<Array<T>>([]);
    const client = useQueryClient();

    useEffect(() => {
        let unmounted = false;
        client.getMutationCache().subscribe((mutation) => {
            if (
                mutation?.options.mutationKey === apiKey ||
                -1 < (mutation?.options.mutationKey || []).indexOf(apiKey) ||
                (linkedId && -1 < (mutation?.options.mutationKey || []).indexOf(linkedId))
            ) {
                if (!unmounted) {
                    setCurrentPage(0);
                }
            }
        });

        return (): any => (unmounted = true);
    }, []);

    const { data, lastPage } = useQueryCollection<T>(
        [apiKey, { currentPage, itemsPerPage, stateFilters, linkedId }],
        () => apiMethod(currentPage, itemsPerPage, stateFilters),
        {
            enabled: enabled && 0 < currentPage,
        },
    );

    useEffect(() => {
        let unmounted = false;
        if (data) {
            setAllData([...(1 === currentPage ? [] : allData), ...data]);
            if (currentPage < lastPage) {
                if (!unmounted) {
                    setCurrentPage(currentPage + 1);
                }
            } else {
                if (!unmounted) {
                    setLoading(false);
                }
            }
        }

        return (): any => (unmounted = true);
    }, [currentPage, data, lastPage]);

    useEffect(() => {
        let unmounted = false;
        if (enabled && 0 === currentPage && !unmounted) {
            setCurrentPage(currentPage + 1);
        }

        return (): any => (unmounted = true);
    }, [enabled, currentPage]);

    useEffect(() => {
        let unmounted = false;
        if (JSON.stringify(stateFilters) !== JSON.stringify(filters)) {
            if (!unmounted) {
                setFilters(filters);
            }
        }
        return (): any => (unmounted = true);
    }, [filters]);

    return {
        isLoading: loading,
        data: allData,
    };
};
