import React from 'react';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'typings/shared';

type Props = {
    error?: ValidationError | string;
};

export const ValidationErrorMessage: React.FC<Props> = ({ error }) => {
    const { t } = useTranslation('schema');

    if (error === undefined) {
        return null;
    } else if (typeof error === 'string') {
        return <>{error}</>;
    } else {
        const { message, values } = error;
        if (undefined === message) {
            return null;
        }
        return <>{t(message, values)}</>;
    }
};
