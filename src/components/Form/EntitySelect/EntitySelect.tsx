import { LinearProgress, SelectProps } from '@material-ui/core';
import { useAllPagesQuery } from 'hooks/useAllPagesQuery';
import React from 'react';
import { ResourceApi } from 'typings/api';
import Select from '../Select';

type Props = SelectProps & {
    api: ResourceApi<any>;
    getLabel: (_item: any) => string;
    name: string;
    label: string;
    withEmpty: boolean;
    filterValues?: (_value: any) => boolean;
    filtersApi?: Record<string, any>;
};

export const EntitySelect: React.FC<Props> = ({
    api,
    getLabel,
    label,
    name,
    withEmpty,
    filterValues,
    filtersApi,
    ...selectProps
}) => {
    const { isLoading, data } = useAllPagesQuery({
        apiKey: api.apiKey,
        apiMethod: (page, itemsPerPage, filters, options) => api.fetchPage(page, itemsPerPage, filters, options),
        filters: filtersApi || {},
    });

    if (isLoading) {
        return <LinearProgress />;
    }

    let elements = [...(data || [])];

    if (filterValues) {
        elements = elements.filter(filterValues);
    }

    const values = elements.map((element) => ({ value: element['@id'], label: getLabel(element) }));

    return <Select {...selectProps} data={values} label={label} name={name} withEmpty={withEmpty} />;
};
