import {DataGrid, GridColumns, GridSortModel} from '@mui/x-data-grid';
import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
    StyledDataGrid,
    StyledDataGridProps,
} from '@project/components/data_grid';
import {energy} from '@p/utils';

const meta: Meta = {
    title: 'Styled Data Grid',
    component: StyledDataGrid,
    argTypes: {},
    parameters: {
        controls: {expanded: true},
    },
};

export default meta;

const Template: Story<StyledDataGridProps> = (args) => (
    <StyledDataGrid {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    columns: [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            editable: false,
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            editable: false,
        },
    ],
    rows: [
        {
            id: 1,
            name: 'first row',
            type: 'type',
        },
        {
            id: 2,
            name: 'first row',
            type: 'type',
        },
    ],

    loading: false,
    defaultSortModel: [
        {
            field: 'created',
            sort: 'desc',
        },
    ],
    sx: {
        height: '100vh',
    },
} as StyledDataGridProps;
