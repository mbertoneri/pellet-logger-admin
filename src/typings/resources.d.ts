import { Roles } from './enums';
import { Optional } from './shared';

export type UserResource = {
    email: string;
    firstName?: Optional<string>;
    lastName: string;
    plainPassword?: string;
    roles: Array<Roles>;
    team?: string;
};
