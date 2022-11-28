import { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { useInterval } from "@project/hooks/use_interval";
import { dollars, energy_kWh } from "@p/utils";
import { Typography, Stack } from "@mui/material";

const meta: Meta = {
  title: "Number Format Test",
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<{ number: number }> = ({ number }) => {
  return (
    <Stack>
      <Typography
        variant={"label" as any}
      >{`Unformatted, raw number: ${number}`}</Typography>
      <Typography
        variant={"label" as any}
      >{`Number, formatted as currency: : ${dollars.format(
        number
      )}`}</Typography>
      <Typography
        variant={"label" as any}
      >{`Number, formatted as kWh with metric prefix: : ${energy_kWh.format(
        number
      )}`}</Typography>
    </Stack>
  );
};

export const Default = Template.bind({});

Default.args = {
  number: 520.123124,
};
