import { createSelector } from '@reduxjs/toolkit';
import { MUISortOptions } from 'mui-datatables';
import { RootState } from 'store';
import { OrNull } from 'typings/shared';
import { ResourceListSelectors, StateResource } from 'typings/state';

type GetResourceState<ResourceState> = (_state: RootState) => ResourceState;

export default (getResourceState: GetResourceState<StateResource>): ResourceListSelectors => {
    const selectItemsPerPage = createSelector<RootState, StateResource, number>(
        getResourceState,
        (resourceState) => resourceState.list.itemsPerPage || 30,
    );

    const selectCurrentPage = createSelector<RootState, StateResource, number>(
        getResourceState,
        (resourceState) => resourceState.list.currentPage || 0,
    );

    const selectSearch = createSelector<RootState, StateResource, OrNull<string>>(
        getResourceState,
        (resourceState) => resourceState.list.search,
    );

    const selectFilters = createSelector<RootState, StateResource, Array<any>>(
        getResourceState,
        (resourceState) => resourceState.list.filters,
    );

    const selectSort = createSelector<RootState, StateResource, MUISortOptions | undefined>(
        getResourceState,
        (resourceState) => resourceState.list.sort,
    );

    return {
        selectItemsPerPage,
        selectCurrentPage,
        selectSearch,
        selectFilters,
        selectSort,
    };
};
