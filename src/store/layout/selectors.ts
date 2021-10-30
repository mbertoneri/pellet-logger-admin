import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { LayoutState } from 'typings/state';

const getLayoutState = (state: RootState): LayoutState => state.layout;

const selectDrawerOpen = createSelector<RootState, LayoutState, boolean>(
    getLayoutState,
    (layoutState) => layoutState.drawerOpen,
);

const selectLocked = createSelector<RootState, LayoutState, boolean>(
    getLayoutState,
    (layoutState) => layoutState.locked,
);

export const layoutSelector = {
    selectDrawerOpen,
    selectLocked,
};
