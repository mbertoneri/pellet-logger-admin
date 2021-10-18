import { Roles } from 'typings/enums';
import { Optional, Violation } from './shared';

export type ErrorPayload = {
    message: Optional<string>;
    description: Optional<string>;
    violations: Optional<Array<Violation>>;
};

export type RequestPayload = {
    isUpdate: boolean;
};

export type JWTPayload = {
    iat: number;
    exp: number;
    roles: Array<Roles>;
    username: string;
};
