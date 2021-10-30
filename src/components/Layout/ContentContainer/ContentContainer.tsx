import React from 'react';
import { useSelector } from 'react-redux';
import { layoutSelector } from 'store/layout/selectors';
import { Main } from 'components/Layout/ContentContainer/styled';

type Props = {
    withoutDrawer?: boolean;
};

const ContentContainer: React.FC<Props> = ({ children, withoutDrawer }) => {
    const drawerOpened = useSelector(layoutSelector.selectDrawerOpen);

    return (
        <Main withoutDrawer={withoutDrawer || false} drawerOpened={drawerOpened}>
            {children}
        </Main>
    );
};

ContentContainer.defaultProps = {
    withoutDrawer: false,
};

export { ContentContainer };
