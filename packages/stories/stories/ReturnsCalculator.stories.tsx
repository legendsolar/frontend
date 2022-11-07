import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ReturnsCalculator, ReturnsCalculatorProps} from '@project/components';
import { UnitEnum} from '@project/hooks/types';

const meta: Meta = {
  title: 'Returns Calculator',
  component: ReturnsCalculator,
  argTypes: {
    setPanels: {action: 'setPanels'},
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReturnsCalculatorProps> = (args) => {
    return (
        <ReturnsCalculator {...args}
        ></ReturnsCalculator>
    );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
        minPanels:1,
        maxPanels:10,
        panelCost:250,
        panelRecords: Array.from({length: 10}).map((_, i) => ({
            panelCount: i,
            analogies: {
                [UnitEnum.DOLLARS]: i + 'd',
                [UnitEnum.CARBON]: i + 'c',
                [UnitEnum.ENERGY]: i + 'e',
            },
            totals: {
                [UnitEnum.DOLLARS]: i * 1000,
                [UnitEnum.CARBON]: i * 100,
                [UnitEnum.ENERGY]: i * 10000,
            },
            imageUrl: {
                [UnitEnum.DOLLARS]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
                [UnitEnum.CARBON]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
                [UnitEnum.ENERGY]:
                    'https://v5.airtableusercontent.com/v1/9/9/1666828800000/wWTs73C__B1l6rfA4eHgXw/A78VJIFYY_DGCKEoZxD23npVYs_VuQLXgmOreiequpVvKdoKePlLP0gS-cv9r8dZ-JJ2SnGINyqmptyDhDmLWw/MqSfH_N2T2B2wVdq9RUAoHwzkVkS6bBRnLQ_-Tk6udU',
            },
        })),
        panels: 1,
};
