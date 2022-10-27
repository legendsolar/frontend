import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MetricGauge, MetricGaugeProps } from '../src';
import { energy } from '../src/static/units';

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
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<MetricGaugeProps> = (args) => <MetricGauge {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  title: 'Title',
  min: 0,
  max: 10,
  currentValue: 5,
  unitOpts: energy,
  error: '',
} as MetricGaugeProps;
