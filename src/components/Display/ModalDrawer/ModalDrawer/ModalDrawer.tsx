import { Drawer as MUIDrawer } from '@mui/material';
import styled from 'styled-components';

export const ModalDrawer = styled(MUIDrawer)`
    .MuiDrawer-paper {
        min-width: 90%;
        max-width: 90%;
    }

    @media (min-width: 768px) {
        .MuiDrawer-paper {
            min-width: unset;
            max-width: 580px;
        }
    }
` as typeof MUIDrawer;
