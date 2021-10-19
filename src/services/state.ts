import { store } from 'store';

export const resetAllState = (): void => {
    const rootState = store.getState();
    const dispatch = store.dispatch;
    Object.keys(rootState).forEach((subState) => {
        dispatch({ type: `${subState}/reset` });
    });
};
