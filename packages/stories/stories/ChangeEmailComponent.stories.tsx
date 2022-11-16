import {DataGrid, GridColumns, GridSortModel} from '@mui/x-data-grid';
import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
    ChangeEmailComponent,
    ChangeEmailComponentProps,
} from '@project/components/inputs';
import {energy} from '@p/utils';

const meta: Meta = {
    title: 'Change Email Component',
    component: ChangeEmailComponent,
    argTypes: {},
    parameters: {
        controls: {expanded: true},
    },
};

export default meta;

const Template: Story<ChangeEmailComponentProps> = (args) => (
    <ChangeEmailComponent {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    initialValues: {email: 'string'},
    onSubmit: ({email}) => console.log(email),
} as ChangeEmailComponentProps;
