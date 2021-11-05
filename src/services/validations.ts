import i18n from 'services/i18n';
import { ValidationError } from 'typings/shared';
import * as yup from 'yup';

export const messages = {
    maxLength: ({ max }: { max: number }): ValidationError => ({
        message: 'schema:string.max_length',
        values: { max },
    }),
    gte: ({ min }: { min: number }): ValidationError => ({
        message: 'schema:number.greater_than_or_equals',
        values: { min },
    }),
    atLeastNElement: ({ min }: { min: number }): ValidationError => ({
        message: 'schema:list.at_least',
        values: { min },
    }),
    atLeastOneOf: ({ path, keys }: { path: string; keys: string }): ValidationError => ({
        message: 'schema:at_least_one_of',
        values: { path, keys },
    }),
};

yup.addMethod(yup.object, 'atLeastOneOf', function (list: Array<string>, translations: Array<string>) {
    return this.test({
        name: 'atLeastOneOf',
        exclusive: true,
        test: function (value) {
            const isValid = value == null || list.some((f) => !!value[f]);
            if (!isValid) {
                // noinspection JSIgnoredPromiseFromCall
                i18n.loadNamespaces(['form']);

                return this.createError({
                    path: list[0],
                    message: messages.atLeastOneOf,
                    params: { keys: translations.map((translation) => i18n.t(translation)).join(', ') },
                });
            }

            return isValid;
        },
    });
});
