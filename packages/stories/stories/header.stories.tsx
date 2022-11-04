import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Header, HeaderProps} from '../../components/src';
const meta: Meta = {
  title: 'Header',
  component: Header,
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
const Template: Story<HeaderProps> = args => <Header {...args} />;
export const Default = Template.bind({});
Default.args = {
};