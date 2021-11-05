import Select, { SelectProps } from 'components/Form/Select';
import React from 'react';
import { Item } from 'typings/shared';

type Props = Omit<SelectProps, 'data'> & {
    data: Array<Item>;
    getLabel: (_item: any) => string;
    filterValues?: (_value: any) => boolean;
};

export const DataSelect: React.FC<Props> = ({ getLabel, filterValues, data, ...selectProps }) => {
    let elements = [...data];

    if (filterValues) {
        elements = elements.filter(filterValues);
    }

    const values = elements.map((element) => ({ value: element['@id'], label: getLabel(element) }));

    return <Select {...selectProps} data={values} />;
};
