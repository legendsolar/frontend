import { useState } from "react";
import { Meta, Story } from "@storybook/react";
import {
  BarChart,
  BarChartProps,
  defaultBarChartDisplayParams,
} from "@project/components/charts";

import { generateFakeProductionData, timeToWattage } from "@project/components";

import TestRawData from "../data/test_raw_data.json";
import FullRawData from "../data/barnyard_raw_data_12_2022.json";

const generationFunctions = {
  barnyardSolarData: FullRawData.data.facilityGenerationByDate,
  spottyTestData: TestRawData.data.facilityGenerationByDate,
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
          barnyardSolarData: "Barnyard Solar Data 12/2022",
          spottyTestData: "Spotty / Zero Test Data",
          flat: "Flat",
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
  rawData: FullRawData.data.facilityGenerationByDate,
  options: defaultBarChartDisplayParams,
  location: {
    lat: 41.373931,
    lng: -74.680555,
  },
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
