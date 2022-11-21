import React from "react";
import { Meta, Story } from "@storybook/react";
import { WeatherLive, WeatherLiveProps } from "@project/components/weather";

const meta: Meta = {
  title: "Weather Live",
  component: WeatherLive,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<WeatherLiveProps> = (args) => <WeatherLive {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  lat: 40.73061,
  lng: -73.935242,
} as WeatherLiveProps;
