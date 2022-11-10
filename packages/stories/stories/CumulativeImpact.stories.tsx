import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
    CumulativeImpact,
    CumulativeImpactProps,
} from '@project/components/gauges';
import {energy} from '@p/utils';

const meta: Meta = {
    title: 'Cumulative Impact',
    component: CumulativeImpact,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: {expanded: true},
    },
};

export default meta;

const Template: Story<CumulativeImpactProps> = (args) => (
    <CumulativeImpact {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    title: 'Title',
    cumulativeData: {
        day: 1,
        week: 10,
        month: 100,
        year: 1000,
    },
    unit: energy,
} as CumulativeImpactProps;
