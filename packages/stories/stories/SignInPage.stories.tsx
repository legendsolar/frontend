import { Meta, Story } from "@storybook/react";
import { SignInPage } from "@project/components/pages/sign_in_page";
import { useState } from "react";

const meta: Meta = {
  title: "Pages/Sign In Page",
  component: SignInPage,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<{}> = (args) => {
  return <SignInPage />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
