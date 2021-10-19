/* eslint-disable @typescript-eslint/naming-convention */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'localforage';
import logger from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { user } from './user/slice';
import { request } from './request/slice';

const serializableCheck = {
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    immutableCheck: { warnAfter: 100 },
};

export const resourceMapping = {};

export const sharedResources = [];

const reducers = {
    user,
    request,
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

export const combinedReducers = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        if (process.env.NODE_ENV === 'production') {
            return getDefaultMiddleware(serializableCheck);
        }

        return getDefaultMiddleware(serializableCheck).concat(logger);
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;