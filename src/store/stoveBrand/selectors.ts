import { RootState } from 'store/index';
import createResourceListSelectors from 'store/ResourceListSelectors';
import { StoveBrandState } from 'typings/state';

const getResourceState = (state: RootState): StoveBrandState => state.stove;

const selectors = {
    ...createResourceListSelectors(getResourceState),
};

export default selectors;
