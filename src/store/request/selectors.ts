import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { OrNull, Violation } from 'typings/shared';
import { RequestState } from 'typings/state';

const getRequestState = (state: RootState): RequestState => state.request;

const selectLoading = createSelector<RootState, RequestState, boolean>(getRequestState, (request) => request.loading);

const selectSubmitting = createSelector<RootState, RequestState, boolean>(
    getRequestState,
    (requestState) => requestState.submitting,
);

const selectPending = createSelector<RootState, RequestState, boolean>(
    getRequestState,
    (requestState) => requestState.loading || requestState.submitting,
);

const selectViolations = createSelector<RootState, RequestState, OrNull<Array<Violation>>>(
    getRequestState,
    (requestState) => requestState.violations,
);

const selectDescription = createSelector<RootState, RequestState, OrNull<string>>(
    getRequestState,
    (requestState) => requestState.description,
);

export const requestSelector = {
    selectLoading,
    selectSubmitting,
    selectPending,
    selectViolations,
    selectDescription,
};
