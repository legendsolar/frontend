import React from 'react';
import { Meta, Story } from '@storybook/react';
import Worm, { WormProps } from '../src/components/worm/worm';
import Component from '../src/components/basics/component';
import { generateFakeProductionData } from '../src/utils/fake_data';

const generationFunctions = {
  variableProduction: generateFakeProductionData(7, 3000),
  sinusoid: generateFakeProductionData(7, 3000, 0),
  flat: generateFakeProductionData(7, 3000, 0, 0),
};

const meta: Meta = {
  title: 'Productivity Worm',
  component: Worm,
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
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<WormProps> = (args) => (
  <Component
    standardWidth={false}
    sx={{
      backgroundColor: 'whiteHaze.main',
      width: '100%',
      p: 0,
      overflow: 'hidden',
    }}
  >
    <Worm {...args} />
  </Component>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  rawData: generateFakeProductionData(7, 3000),
  loading: false,
  error: false,
  nightThreshold_W: 1000,
  max_W: 3000,
  sx: {},
} as WormProps;
