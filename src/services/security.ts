import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { UserApiItem } from 'typings/api';
import { Roles } from 'typings/enums';
import { JWTPayload } from 'typings/payloads';
import { JWTToken, SwitchUser } from 'typings/shared';

const roleHierarchy: Partial<Record<Roles, Array<Roles>>> = {
    [Roles.MANAGER]: [Roles.TRADER, Roles.WEBMASTER, Roles.ACCOUNTING, Roles.BUTLER],
    [Roles.WEBMASTER]: [Roles.BASE_USER],
    [Roles.ACCOUNTING]: [Roles.BASE_USER],
    [Roles.BUTLER]: [Roles.BASE_USER],
    [Roles.TRADER]: [Roles.BASE_USER],
    [Roles.ADMIN]: [],
    [Roles.SUPER_ADMIN]: [Roles.ALLOWED_TO_SWITCH, Roles.ADMIN],
};

const getSubRoles = (role: Roles, roles?: Array<Roles>): Array<Roles> => {
    if (undefined === roles) {
        roles = [];
    }
    const subRoles = roleHierarchy[role];
    if (undefined !== subRoles) {
        roles = roles.concat(subRoles);
        subRoles.forEach((subRole) => (roles = getSubRoles(subRole, roles)));
    }

    return roles;
};

export const getLinkedRoles = (roles: Roles | Array<Roles>): Array<Roles> => {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }
    let linkedRoles = [] as Array<Roles>;
    roles.forEach((role) => (linkedRoles = getSubRoles(role)));

    return [...roles, ...linkedRoles];
};

export const getToken = (): JWTToken =>
    process.env.REACT_APP_JWT_PATH !== undefined ? Cookies.get(process.env.REACT_APP_JWT_PATH) || null : null;

export const getSwitchUser = (): SwitchUser =>
    process.env.REACT_APP_SWITCH_USER_PATH !== undefined
        ? Cookies.get(process.env.REACT_APP_SWITCH_USER_PATH || 'switch_user') || null
        : null;

export const getRolesFromToken = (): Array<Roles> => {
    const token = getToken();
    if (null === token) {
        return [];
    }

    const decoded = jwtDecode<JWTPayload>(token);

    return decoded.roles;
};

export const isRoleGranted = (baseRoles: Array<Roles>, rolesToCheck: Array<Roles>): boolean =>
    rolesToCheck.some((role) => baseRoles.includes(role));

export const isUserGranted = (user: UserApiItem, roles: Array<Roles>): boolean => {
    if (undefined === user) {
        return false;
    }
    const userRoles = getLinkedRoles(user.roles);

    return roles.some((role) => userRoles.includes(role));
};
