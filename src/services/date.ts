import { DateTime } from 'luxon';

export const formatDate = (date: string, _format = 'dd/MM/yyyy'): string => {
    if (!date) {
        return '';
    }

    return DateTime.fromISO(date).toFormat(_format);
};
