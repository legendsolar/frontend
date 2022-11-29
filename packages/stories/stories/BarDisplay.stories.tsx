import { useState } from "react";
import { Meta, Story } from "@storybook/react";
import {
  BarChart,
  BarChartProps,
  defaultBarChartDisplayParams,
} from "@project/components/charts";
import { useInterval } from "@project/hooks/use_interval";

import { generateFakeProductionData, timeToWattage } from "@project/components";
import { GenerationDatum } from "@project/components/schema/schema_gen_types";
import { addHours } from "date-fns";

const generationFunctions = {
  variableProduction: generateFakeProductionData(7, 3000),
  sinusoid: generateFakeProductionData(7, 3000, 0),
  flat: generateFakeProductionData(7, 3000, 0, 0),
};

const meta: Meta = {
  title: "Bar Chart",
  component: BarChart,
  argTypes: {
    rawData: {
      options: Object.keys(generationFunctions),
      mapping: generationFunctions,
      control: {
        type: "select",
        labels: {
          variableProduction: "Variable Production",
          sinusoid: "Sinusoidal Production",
          flat: "Flat Production",
        },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BarChartProps> = (args) => <BarChart {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  rawData: generateFakeProductionData(7, 3000, 0),
  options: defaultBarChartDisplayParams,
  loading: false,
  error: false,
} as BarChartProps;

// const AnimatedTemplate: Story<BarChartProps> = (args) => {
//   const [time, setTime] = useState(new Date());
//   const [data, setData] = useState(args.rawData);

//   useInterval(() => {
//     const newDatum = {
//       time: time.toISOString(),
//       wattage: timeToWattage(time, 3000),
//     } as GenerationDatum;

//     const newData = [...data.slice(1), newDatum];

//     setData(newData);
//     setTime(addHours(time, 1));
//   }, 500);

//   return <BarChart {...{ ...args, rawData: data }} />;
// };

// export const Animated = AnimatedTemplate.bind({});

// Animated.args = {
//   rawData: generateFakeProductionData(7, 3000, 0),
//   options: defaultBarChartDisplayParams,
//   loading: false,
//   error: false,
// } as BarChartProps;
