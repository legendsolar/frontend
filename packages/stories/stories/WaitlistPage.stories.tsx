import { Meta, Story } from "@storybook/react";
import {
  WaitlistPage,
  WaitlistPageProps,
} from "@project/components/pages/waitlist_page";
import { useState } from "react";

const meta: Meta = {
  title: "Pages/Waitlist Page",
  component: WaitlistPage,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<WaitlistPageProps> = (args) => {
  return <WaitlistPage {...args} />;
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  waitlistPosn: 1234,
  referralLink:
    "https://www.legends.solar/you-have-early-access?autoDetect=1&referralCode=nvyomge",
} as WaitlistPageProps;
