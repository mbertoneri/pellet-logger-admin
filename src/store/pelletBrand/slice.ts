import { createResourceSlice, resourceInitialState } from 'store/ResourceSlice';
import { ResourceSlice, StateResource } from 'typings/state';

const listInitialState: StateResource = resourceInitialState();

export const initialState = {
    ...listInitialState,
};

const slice = createResourceSlice({
    name: 'pellet_brand',
    initialState,
});

export const pelletBrand = slice.reducer;
export const actions = slice.actions as ResourceSlice & typeof slice.actions;
