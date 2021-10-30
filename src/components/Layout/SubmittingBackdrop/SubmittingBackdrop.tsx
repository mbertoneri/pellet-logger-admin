import { CircularProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { requestSelector } from 'store/request/selectors';
import { layoutSelector } from 'store/layout/selectors';
import { Backdrop } from 'components/Layout/SubmittingBackdrop/styled';

export const SubmittingBackdrop: React.FC = () => {
    const submitting = useSelector(requestSelector.selectSubmitting);
    const locked = useSelector(layoutSelector.selectLocked);

    return (
        <Backdrop open={submitting || locked}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
