import { UseFormReturn } from 'react-hook-form';
import { OrNull, Violation } from 'typings/shared';
import I18n from 'services/i18n';

const toTranslateMessages = ['rental.already_booked'];

I18n.loadNamespaces('schema');

export const mergeErrors = (setError: UseFormReturn<any>['setError'], violations: OrNull<Violation[]>): void => {
    if (null !== violations) {
        violations.map((violation, index) => {
            setError(
                violation.propertyPath,
                {
                    message: toTranslateMessages.includes(violation.message)
                        ? I18n.t(`schema:api.${violation.message}`)
                        : violation.message,
                },
                { shouldFocus: 0 === index },
            );
        });
    }
};
