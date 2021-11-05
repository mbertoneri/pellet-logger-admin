import { createResourceApi } from 'resources/ResourceApi';
import { StoveApiItem } from 'typings/api';

export default { ...createResourceApi<StoveApiItem>('stoves') };
