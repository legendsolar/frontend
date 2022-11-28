import React from "react";
import { Meta, Story } from "@storybook/react";
import { MetricGauge, MetricGaugeProps } from "@project/components";
import { watts_kW, carbonEnglish, dollars } from "@p/utils";

const unitOptions = {
  watts_kW,
  carbonEnglish,
  dollars,
};

const meta: Meta = {
  title: "Metric Gauge",
  component: MetricGauge,
  argTypes: {
    unit: {
      options: Object.keys(unitOptions),
      mapping: unitOptions,
      control: {
        type: "select",
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
  title: "Title",
  message: "lower corner message",
  min: 0,
  max: 10,
  currentValue: 5,
  unit: watts_kW,
  error: "",
  inactiveGaugeColor: "#F4F5F5",
  maxArcWidth: 360,
  maxFontSize: 60,
  minFontDisplaySize: 26,
} as MetricGaugeProps;
