import { createSlice, PayloadAction, Slice, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { MUISortOptions } from 'mui-datatables';
import { OrNull } from 'typings/shared';
import { List, StateResource } from 'typings/state';

const DEFAULT_ITEMS_PER_AGE = 30;

export const resourceInitialState = (itemsPerPage = DEFAULT_ITEMS_PER_AGE): { list: List } => ({
    list: {
        currentPage: 1,
        itemsPerPage,
        filters: [],
        search: null,
    },
});

export const createResourceSlice = <S extends StateResource, Reducers extends SliceCaseReducers<S>>({
    name,
    initialState,
    reducers = {} as ValidateSliceCaseReducers<typeof initialState, Reducers>,
}: {
    name: string;
    initialState: S;
    reducers?: ValidateSliceCaseReducers<typeof initialState, Reducers>;
}): Slice<S, typeof reducers> =>
    createSlice({
        name,
        initialState,
        reducers: {
            setCurrentPage: (state: StateResource, action: PayloadAction<number>): void => {
                state.list.currentPage = action.payload;
            },
            setItemsPerPage: (state: StateResource, action: PayloadAction<number>): void => {
                if (state.list.itemsPerPage !== action.payload) {
                    state.list.currentPage = 1;
                }
                state.list.itemsPerPage = action.payload;
            },
            setSearch: (state: StateResource, action: PayloadAction<OrNull<string>>): void => {
                if (state.list.search !== action.payload) {
                    state.list.currentPage = 1;
                }
                state.list.search = action.payload;
            },
            setFilters: (state: StateResource, action: PayloadAction<Array<any>>): void => {
                if (state.list.filters !== action.payload) {
                    state.list.currentPage = 1;
                }
                state.list.filters = action.payload;
            },
            setSort: (state: StateResource, action: PayloadAction<MUISortOptions>): void => {
                state.list.sort = action.payload;
            },
            ...reducers,
        },
    });
