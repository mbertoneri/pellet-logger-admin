import { ComponentType, Fragment, lazy, LazyExoticComponent } from 'react';

type Factory<T extends ComponentType<any>> = () => Promise<{ default: T }>;

const lazyWithRetry = <T extends ComponentType<any>>(componentImport: Factory<T>): LazyExoticComponent<T> =>
    lazy(async () => {
        const pageHasAlreadyBeenForceRefreshed = JSON.parse(
            window.localStorage.getItem('page-has-been-force-refreshed') || 'false',
        );

        try {
            const component = await componentImport();
            window.localStorage.setItem('page-has-been-force-refreshed', 'false');

            return component;
        } catch (error) {
            if (!pageHasAlreadyBeenForceRefreshed) {
                window.localStorage.setItem('page-has-been-force-refreshed', 'true');
                window.location.reload();

                return { default: Fragment as unknown as T };
            }

            throw error;
        }
    });

export default lazyWithRetry;
