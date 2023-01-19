import { Meta, Story } from "@storybook/react";
import {
  States,
  WebflowNavBar,
  WebflowNavBarProps,
} from "@project/components/nav/webflow_nav_bar";
import { useState } from "react";

const meta: Meta = {
  title: "Webflow/Webflow Nav Bar",
  component: WebflowNavBar,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<WebflowNavBarProps> = (args) => {
  return <WebflowNavBar {...args} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const ReservePanel_NotConstrained = Template.bind({});

ReservePanel_NotConstrained.args = {
  state: States.RESERVE_PANEL,
  constrained: false,
} as WebflowNavBarProps;

export const ReservePanel_Constrained = Template.bind({});

ReservePanel_Constrained.args = {
  state: States.RESERVE_PANEL,
  constrained: true,
} as WebflowNavBarProps;

export const LoggedOut_NotConstrained = Template.bind({});

LoggedOut_NotConstrained.args = {
  state: States.LOGGED_IN_PANELS,
  constrained: false,
} as WebflowNavBarProps;
