import { TextField as MUITextField, TextFieldProps } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

type Props = TextFieldProps & {
    name: string;
};
export const TextField: React.FC<Props> = React.memo(
    ({ name, defaultValue, ...textFieldProps }) => {
        const { control, getValues } = useFormContext();
        const {
            field: { ref, value, ...rest },
        } = useController({
            name,
            control,
            defaultValue: getValues(name) || defaultValue || '',
        });

        return <MUITextField value={value ?? ''} {...rest} {...textFieldProps} inputRef={ref} />;
    },
    (prevProps, nextProps): boolean => _.isEqual(prevProps, nextProps),
);
