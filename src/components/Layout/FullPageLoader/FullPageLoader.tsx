import React from 'react';
import { CircularProgress } from '@mui/material';
import { FullPageContainer } from 'components/Layout/FullPageLoader/styled';

export const FullPageLoader: React.FC = () => (
    <FullPageContainer>
        <CircularProgress />
    </FullPageContainer>
);
