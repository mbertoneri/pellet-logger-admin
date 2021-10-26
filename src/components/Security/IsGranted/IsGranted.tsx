import { useIsGranted } from 'hooks/useIsGranted';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Roles } from 'typings/enums';

type Props = Record<any, any> & {
    roles?: Roles | Array<Roles>;
};

export const IsGranted: React.FC<PropsWithChildren<Props>> = React.forwardRef(
    ({ roles, children, ...childrenProps }, _ref) => {
        const isGranted = useIsGranted(roles);

        if (!isGranted) {
            return null;
        }

        if (null !== children && undefined !== children && 'object' === typeof children && !Array.isArray(children)) {
            children = {
                ...children,
                props: {
                    ...((children as ReactElement).props ?? {}),
                    ...childrenProps,
                },
            };
        }

        return <>{children}</>;
    },
);
