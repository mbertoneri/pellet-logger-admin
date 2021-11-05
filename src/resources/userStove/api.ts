import { AxiosPromise } from 'axios';
import { DEFAULT_FETCHED_ITEMS_PER_AGE } from 'resources/ResourceApi';
import { requestApi } from 'services/axios';
import { CollectionJsonLD, UserStoveApiItem } from 'typings/api';

export const userStoves = (
    page: number,
    itemsPerPage = DEFAULT_FETCHED_ITEMS_PER_AGE,
): AxiosPromise<CollectionJsonLD<UserStoveApiItem>> => {
    const queryParameters = {
        page,
        itemsPerPage,
    };

    return requestApi({
        url: `/user_stoves`,
        params: queryParameters,
    });
};

// export default {
//     userStoves,
// };
