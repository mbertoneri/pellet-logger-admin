import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/index';
import createResourceListSelectors from 'store/ResourceListSelectors';
import { UserApiItem } from 'typings/api';
import { OrNull } from 'typings/shared';
import { UserState } from 'typings/state';

const getResourceState = (state: RootState): UserState => state.user;

const selectIsConnected = createSelector<RootState, UserState, boolean>(
    getResourceState,
    (authState) => authState.connectedUser !== null,
);

export const selectConnectedUser = createSelector<RootState, UserState, OrNull<UserApiItem>>(
    getResourceState,
    (authState) => authState.connectedUser,
);

const selectors = {
    ...createResourceListSelectors(getResourceState),
    selectIsConnected,
    selectConnectedUser,
};

export default selectors;
