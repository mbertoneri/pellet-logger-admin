import AppBar from 'components/Layout/AppBar';
import Drawer from 'components/Layout/Drawer';
import SubmittingBackdrop from 'components/Layout/SubmittingBackdrop';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from 'store/layout/slice';
import { Optional } from 'typings/shared';

type Props = {
    title?: string | ReactElement;
    subtitle?: string | ReactElement;
    selectedElementInDrawer?: string;
    handleBack?: () => unknown;
    withDrawer?: boolean;
    withAccount?: boolean;
    menus?: Optional<ReactElement[]>;
    handleClose?: () => unknown;
    color?: string;
};

const defaultProps = {
    withDrawer: true,
    withAccount: true,
};

const Toolbar: React.FC<Props> = ({
    title,
    subtitle,
    selectedElementInDrawer,
    withDrawer,
    withAccount,
    handleBack,
    menus,
    handleClose,
    color,
}) => {
    const dispatch = useDispatch();

    const openDrawer = (): void => {
        dispatch(setDrawerOpen(true));
    };

    const closeDrawer = (): void => {
        dispatch(setDrawerOpen(false));
    };

    withDrawer = undefined === withDrawer ? defaultProps.withDrawer : withDrawer;
    withAccount = undefined === withAccount ? defaultProps.withDrawer : withAccount;

    return (
        <>
            <SubmittingBackdrop />
            <AppBar
                title={title}
                subtitle={subtitle}
                handleBack={handleBack}
                withDrawer={withDrawer}
                withAccount={withAccount}
                toggleDrawer={openDrawer}
                menus={menus}
                handleClose={handleClose}
                color={color}
            />
            {withDrawer && <Drawer toggleDrawer={closeDrawer} selectedElement={selectedElementInDrawer} />}
        </>
    );
};

export { Toolbar };
