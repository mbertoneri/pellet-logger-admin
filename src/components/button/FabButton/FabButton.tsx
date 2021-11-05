import { Apps as FabIcon } from '@mui/icons-material';
import { SpeedDialProps } from '@mui/lab/SpeedDial/SpeedDial';
import { SpeedDialAction } from '@mui/material';
import { StyledSpeedDial } from './styled';
import IsGranted from 'components/Security/IsGranted';
import React, { useState } from 'react';
import { FabActionType } from 'typings/shared';

type Props = SpeedDialProps & {
    fabActions: Array<FabActionType>;
};

export const FabButton: React.FC<Props> = ({ fabActions, direction }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (): void => {
        setOpen(!open);
    };

    return (
        <StyledSpeedDial
            ariaLabel="speed-dial"
            open={open}
            icon={<FabIcon />}
            onClick={handleClick}
            direction={direction ? direction : 'left'}
        >
            {fabActions.map((action) => (
                <IsGranted roles={action.roles} key={action.key}>
                    <SpeedDialAction icon={action.icon} tooltipTitle={action.tooltip} onClick={action.onClick} />
                </IsGranted>
            ))}
        </StyledSpeedDial>
    );
};
