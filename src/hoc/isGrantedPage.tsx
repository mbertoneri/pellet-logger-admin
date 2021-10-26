import { FullPageLoader } from 'components/Layout/FullPageLoader/FullPageLoader';
import NotGranted from 'components/Security/NotGranted';
import { useIsGranted } from 'hooks/useIsGranted';
import React, { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { Roles } from 'typings/enums';

const isGrantedPage =
    (WrappedComponent: ComponentType, roles?: Roles | Array<Roles>) =>
    (props: PropsWithChildren<any>): ReactElement => {
        const isGranted = undefined === roles ? true : useIsGranted(roles);
        if (null === isGranted) {
            return <FullPageLoader />;
        }

        if (!isGranted) {
            return <NotGranted />;
        }

        return <WrappedComponent {...props} />;
    };

export default isGrantedPage;
