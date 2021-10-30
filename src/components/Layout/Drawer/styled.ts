import { styled } from '@mui/material';
import { ListItemLink } from 'components/Layout/Drawer/ListItemLink';

export const NestedListItemLink = styled(ListItemLink)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
}));
