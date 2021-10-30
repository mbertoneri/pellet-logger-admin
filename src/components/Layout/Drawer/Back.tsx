import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins,
}));

type Props = {
    toggleDrawer: () => void;
};

export const Back: React.FC<Props> = ({ toggleDrawer }) => (
    <Container>
        <div>
            <Typography variant="body1" display="block">
                Pellet
            </Typography>
            <Typography variant="subtitle2" display="block">
                Logger
            </Typography>
        </div>

        <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
        </IconButton>
    </Container>
);
