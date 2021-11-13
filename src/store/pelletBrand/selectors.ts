import { RootState } from 'store/index';
import createResourceListSelectors from 'store/ResourceListSelectors';
import { PelletBrandState } from 'typings/state';

const getResourceState = (state: RootState): PelletBrandState => state.pelletBrand;

const selectors = { ...createResourceListSelectors(getResourceState) };

export default selectors;
