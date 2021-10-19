import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { createResourceSlice, resourceInitialState } from 'store/ResourceSlice';
import { UserApiItem } from 'typings/api';
import { AuthState, ResourceSlice, UserState } from 'typings/state';

const listInitialState: UserState = resourceInitialState();

const authInitialState: AuthState = {
    connectedUser: null,
};

export const initialState = {
    ...listInitialState,
    ...authInitialState,
};

const slice = createResourceSlice({
    name: 'user',
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<UserApiItem>): void => {
            state.connectedUser = action.payload;
        },
        disconnect: (state): void => {
            state.connectedUser = null;
            Cookies.remove(process.env.REACT_APP_JWT_PATH || 'jwt_token');
        },
        connectAs: (state, action: PayloadAction<UserApiItem>): void => {
            state.connectedUser = action.payload;
            Cookies.set(process.env.REACT_APP_SWITCH_USER_PATH || 'switch_user', action.payload.email);
        },
        disconnectAs: (state): void => {
            state.connectedUser = null;
            Cookies.remove(process.env.REACT_APP_SWITCH_USER_PATH || 'switch_user');
        },
    },
});

export const user = slice.reducer;
export const actions: ResourceSlice & typeof slice.actions = slice.actions;
