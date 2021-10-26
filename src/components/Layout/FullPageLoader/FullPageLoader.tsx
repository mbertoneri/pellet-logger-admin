import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { FullPageContainer } from 'components/Layout/FullPageLoader/styled';

export const FullPageLoader: React.FC = () => (
    <FullPageContainer>
        <CircularProgress />
    </FullPageContainer>
);
