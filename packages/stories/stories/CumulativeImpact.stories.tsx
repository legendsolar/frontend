import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  CumulativeImpact,
  CumulativeImpactProps,
} from "@project/components/gauges";
import { energy, carbonEnglish, dollars } from "@p/utils";

const unitOptions = {
  energy,
  carbonEnglish,
  dollars,
};

const meta: Meta = {
  title: "Cumulative Impact",
  component: CumulativeImpact,
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

const Template: Story<CumulativeImpactProps> = (args) => (
  <CumulativeImpact {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  title: "Title",
  cumulativeData: {
    day: {
      current: 1,
      average: 1,
      best: 1,
    },
    week: {
      current: 10,
      average: 10,
      best: 10,
    },
    month: {
      current: 100,
      average: 100,
      best: 100,
    },
    year: {
      current: 1000,
      average: 1000,
      best: 1000,
    },
  },
  unit: energy,
} as CumulativeImpactProps;
