import { Meta, Story } from "@storybook/react";
import { SignUpPage } from "@project/components/pages/sign_up_page";
import { useState } from "react";

const meta: Meta = {
  title: "Pages/Sign Up Page",
  component: SignUpPage,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<{}> = (args) => {
  return <SignUpPage />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
