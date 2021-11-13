import { DatePicker, DatePickerProps, DateTimePicker, DateTimePickerProps } from '@mui/lab';
import { TextField, TextFieldProps } from '@mui/material';
import ValidationErrorMessage from 'components/Form/ValidationErrorMessage';
import _ from 'lodash';
import React, { ReactElement } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = Omit<
    Pick<DateTimePickerProps & DatePickerProps, 'maxDate' | 'minDate'> &
        TextFieldProps & {
            name: string;
            withTime?: boolean;
        },
    'onChange' | 'value'
>;

export const LocalizedDatePicker: React.FC<Props> = ({
    name,
    withTime,
    maxDate,
    minDate,
    defaultValue,
    ...datePickerProps
}) => {
    const { t } = useTranslation('form');
    const Component = withTime ? DateTimePicker : DatePicker;
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        field: { ref: _ref, value, ...rest },
    } = useController({
        name,
        control,
        defaultValue: defaultValue || '',
    });

    const error = _.get(errors, name);

    return (
        <Component
            inputFormat={withTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
            ampm={false}
            okText={t('form:date_picker.ok')}
            cancelText={t('form:date_picker.cancel')}
            clearText={t('form:date_picker.clear')}
            todayText={t('form:date_picker.today')}
            maxDate={maxDate}
            minDate={minDate}
            renderInput={(props): ReactElement => (
                <TextField
                    {...props}
                    {...datePickerProps}
                    error={Boolean(error)}
                    helperText={<ValidationErrorMessage error={error?.message} />}
                />
            )}
            {...rest}
            value={value}
        />
    );
};
