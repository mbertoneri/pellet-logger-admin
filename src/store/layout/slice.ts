import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutState } from 'typings/state';

export const initialState: LayoutState = {
    drawerOpen: false,
    locked: false,
};

const slice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setDrawerOpen: (state, action: PayloadAction<boolean>): void => {
            state.drawerOpen = action.payload;
        },
        setLocked: (state, action: PayloadAction<boolean>): void => {
            state.locked = action.payload;
        },
    },
});

export const layout = slice.reducer;

export const { setDrawerOpen, setLocked } = slice.actions;
