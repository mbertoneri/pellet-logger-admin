import { RootState } from 'store/index';
import createResourceListSelectors from 'store/ResourceListSelectors';
import { StoveState } from 'typings/state';

const getResourceState = (state: RootState): StoveState => state.stove;

const selectors = {
    ...createResourceListSelectors(getResourceState),
};

export default selectors;
