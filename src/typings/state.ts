import { CaseReducer, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { MUISortOptions } from 'mui-datatables';
import { OutputSelector } from 'reselect';
import { ApiErrors, UserApiItem } from 'typings/api';
import { OrNull } from 'typings/shared';

export type ResourceListSelectors = {
    selectItemsPerPage: OutputSelector<RootState, any, (res: any) => number>;
    selectCurrentPage: OutputSelector<RootState, any, (res: any) => number>;
    selectSearch: OutputSelector<RootState, any, (res: any) => OrNull<string>>;
    selectFilters: OutputSelector<RootState, any, (res: any) => Array<any>>;
    selectSort: OutputSelector<RootState, any, (res: any) => MUISortOptions | undefined>;
};

export type ResourceSlice = SliceCaseReducers<StateResource> & {
    setCurrentPage: CaseReducer<StateResource, PayloadAction<any>>;
    setItemsPerPage: CaseReducer<StateResource, PayloadAction<any>>;
    setSearch: CaseReducer<StateResource, PayloadAction<any>>;
    setFilters: CaseReducer<StateResource, PayloadAction<any>>;
    setSort: CaseReducer<StateResource, PayloadAction<any>>;
    reset: CaseReducer<StateResource, PayloadAction<any>>;
};

export type List = {
    currentPage: number;
    itemsPerPage?: number;
    filters: Array<any>;
    search: OrNull<string>;
    sort?: MUISortOptions;
};

export type StateResource = {
    list: List;
};

export type AuthState = {
    connectedUser: OrNull<User>;
};

export type LayoutState = {
    drawerOpen: boolean;
    locked: boolean;
};

export type RequestState = ApiErrors & {
    loading: boolean;
    submitting: boolean;
};

export type UserState = StateResource<UserApiItem> & AuthState;
