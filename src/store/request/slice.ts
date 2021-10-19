import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorPayload, RequestPayload } from 'typings/payloads';
import { Optional } from 'typings/shared';
import { RequestState } from 'typings/state';

export const initialState: RequestState = {
    message: null,
    description: null,
    loading: false,
    submitting: false,
    violations: null,
};

const slice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        resetErrors: (state): void => {
            state.message = null;
            state.description = null;
            state.violations = null;
        },
        init: (state, action: PayloadAction<RequestPayload>): void => {
            slice.caseReducers.resetErrors(state);
            state.loading = true;
            state.submitting = false;
            if (action.payload.isUpdate) {
                state.submitting = true;
                state.loading = false;
            }
        },
        success: (state): void => {
            state.loading = false;
            state.submitting = false;
            state.violations = null;
        },
        failure: (state, action: PayloadAction<Optional<ErrorPayload>>): void => {
            state.loading = false;
            state.submitting = false;
            state.message = action.payload?.message ?? null;
            state.description = action.payload?.description ?? null;
            state.violations = action.payload?.violations ?? null;
        },
    },
});

export const request = slice.reducer;

export const { init, success, failure, resetErrors } = slice.actions;
