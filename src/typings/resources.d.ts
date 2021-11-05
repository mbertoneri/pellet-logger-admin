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

export type StoveBrandResource = {
    title: string;
};

export type StoveResource = {
    title: string;
    stoveBrand: string;
};

export type UserStoveResource = {
    purchasePrice: number;
    stove: {
        title: string;
        stoveBrand: string;
        '@id': string;
    };
};
