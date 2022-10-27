import React from 'react';
import { Meta, Story } from '@storybook/react';
import Component, { ComponentProps } from '../src/basics/component';

const meta: Meta = {
  title: 'Component',
  component: Component,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onClick: {
      action: 'clicked',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ComponentProps> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  inactive: true,
  disabled: false,
  shadow: false,
  standardWidth: true,
  resize: false,
  haze: false,
  sx: {},
  background: true,
  children: <div>{'component'}</div>,
} as ComponentProps;

Default.argTypes = {
  onClick: { action: 'clicked' },
};
