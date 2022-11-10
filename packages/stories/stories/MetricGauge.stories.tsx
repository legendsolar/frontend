import React from 'react';
import {Meta, Story} from '@storybook/react';
import {MetricGauge, MetricGaugeProps} from '@project/components';
import {energy} from '@p/utils';

const meta: Meta = {
    title: 'Metric Gauge',
    component: MetricGauge,
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

const Template: Story<MetricGaugeProps> = (args) => <MetricGauge {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    title: 'Title',
    message: 'lower corner message',
    min: 0,
    max: 10,
    currentValue: 5,
    unit: energy,
    error: '',
} as MetricGaugeProps;
