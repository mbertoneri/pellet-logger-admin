import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect, SelectProps } from '@material-ui/core';
import lodash from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ValidationErrorMessage from '../ValidationErrorMessage';

export type Props = SelectProps & {
    data: Array<{ value: string | number; label: string | number }>;
    label: string;
    name: string;
    withEmpty: boolean;
};

export const Select: React.FC<Props> = React.memo(({ data, label, name, withEmpty, defaultValue, ...selectProps }) => {
    const {
        formState: { errors },
        control,
    } = useFormContext();

    const errorField = lodash.get(errors, name);

    const children = data.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
            {label}
        </MenuItem>
    ));

    if (withEmpty) {
        children.unshift(
            <MenuItem value="" key="empty">
                &nbsp;
            </MenuItem>,
        );
    }

    return (
        <>
            <FormControl fullWidth error={Boolean(errorField)}>
                <InputLabel id={`${name}-id-label`}>{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { ref: _, ...rest } }): React.ReactElement => {
                        if (null === rest.value) {
                            rest.value = '';
                        }

                        if (selectProps.multiple && !Array.isArray(rest.value)) {
                            rest.value = [rest.value];
                        }
                        return (
                            <MUISelect {...selectProps} {...rest} labelId={`${name}-id-label`} id={`${name}-id`}>
                                {children}
                            </MUISelect>
                        );
                    }}
                    defaultValue={defaultValue || (selectProps.multiple ? [] : '')}
                />
                <FormHelperText>
                    <ValidationErrorMessage error={errorField?.message} />
                </FormHelperText>
            </FormControl>
        </>
    );
});
