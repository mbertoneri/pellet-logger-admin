import { useSelector } from 'react-redux';
import { isUserGranted } from 'services/security';
import userSelectors from 'store/user/selectors';
import { Roles } from 'typings/enums';
import { OrNull } from 'typings/shared';

export const useIsGranted = (roles: undefined | Roles | Array<Roles>): OrNull<boolean> => {
    if (undefined === roles) {
        return true;
    }

    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    const connectedUser = useSelector(userSelectors.selectConnectedUser);
    if (null === connectedUser) {
        return null;
    }

    return isUserGranted(connectedUser, roles);
};
