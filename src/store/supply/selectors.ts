import { RootState } from 'store/index';
import createResourceListSelectors from 'store/ResourceListSelectors';
import { SupplyState } from 'typings/state';

const getResourceState = (state: RootState): SupplyState => state.supply;

const selectors = {
    ...createResourceListSelectors(getResourceState),
};

export default selectors;
