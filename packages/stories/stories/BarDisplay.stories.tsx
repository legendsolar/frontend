import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
    BarChart,
    BarChartProps,
    defaultChartDisplayParams,
} from '@project/components/charts';
import {generateFakeProductionData} from '@project/components';

const generationFunctions = {
    variableProduction: generateFakeProductionData(7, 3000),
    sinusoid: generateFakeProductionData(7, 3000, 0),
    flat: generateFakeProductionData(7, 3000, 0, 0),
};

const meta: Meta = {
    title: 'Bar Chart',
    component: BarChart,
    argTypes: {
        rawData: {
            options: Object.keys(generationFunctions),
            mapping: generationFunctions,
            control: {
                type: 'select',
                labels: {
                    variableProduction: 'Variable Production',
                    sinusoid: 'Sinusoidal Production',
                    flat: 'Flat Production',
                },
            },
        },
    },
    parameters: {
        controls: {expanded: true},
    },
};

export default meta;

const Template: Story<BarChartProps> = (args) => <BarChart {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    rawData: generateFakeProductionData(2, 3000),
    loading: false,
    error: false,
    options: defaultChartDisplayParams,
} as BarChartProps;
