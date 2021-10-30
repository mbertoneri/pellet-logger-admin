import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ListItem, ListItemProps } from '@mui/material';

type Props = ListItemProps<'a', { button?: true }> & {
    toggleDrawer: () => void;
};

export const ListItemLink: React.FC<Props> = ({ children, href, toggleDrawer, ...otherProps }) => {
    const history = useHistory();
    const handleClick = useCallback((): void => {
        if (undefined !== href) {
            history.push(href);
        }
        toggleDrawer();
    }, [href, toggleDrawer]);

    return (
        <ListItem button component="a" onClick={handleClick} {...otherProps}>
            {children}
        </ListItem>
    );
};
