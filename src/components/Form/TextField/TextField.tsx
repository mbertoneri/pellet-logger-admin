import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import ValidationErrorMessage from 'components/Form/ValidationErrorMessage';
import _ from 'lodash';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

type Props = Omit<TextFieldProps, 'variant'> & {
    name: string;
    variant?: TextFieldProps['variant'];
};
export const TextField: React.FC<Props> = React.memo(
    ({ name, defaultValue, ...textFieldProps }) => {
        const {
            control,
            formState: { errors },
        } = useFormContext();
        const {
            field: { ref, value, ...rest },
        } = useController({
            name,
            control,
            defaultValue: defaultValue || '',
        });

        const error = _.get(errors, name);

        return (
            <MUITextField
                id={textFieldProps.id ?? name}
                {...textFieldProps}
                {...rest}
                value={value ?? ''}
                error={Boolean(error)}
                inputRef={ref}
                helperText={<ValidationErrorMessage error={error?.message} />}
                variant="standard"
            />
        );
    },
    (prevProps, nextProps): boolean => _.isEqual(prevProps, nextProps),
);
