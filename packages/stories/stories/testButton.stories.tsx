import React from 'react';
import { Meta, Story } from '@storybook/react';
import { TestButton, HeaderProps} from '../../components/src';
const meta: Meta = {
  title: 'Test Button',
  component: TestButton,
  argTypes: {
    text: {
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
const Template: Story<HeaderProps> = args => <TestButton{...args} />;
export const Default = Template.bind({});
Default.args = {
    text: "hello"
};