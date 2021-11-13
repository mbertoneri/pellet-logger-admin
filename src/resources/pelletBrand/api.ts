import { createResourceApi } from 'resources/ResourceApi';
import { PelletBrandApiItem } from 'typings/api';

export default { ...createResourceApi<PelletBrandApiItem>('pellet_brands') };
