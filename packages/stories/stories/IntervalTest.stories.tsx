import { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { useInterval } from "@project/hooks/use_interval";

const meta: Meta = {
  title: "Delta Time",
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    onClick: {
      action: "clicked",
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<{ deltaTime: number }> = ({ deltaTime }) => {
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    setCounter(counter + 1);
  }, deltaTime);

  return (
    <div>
      <div>{`updates every ${deltaTime}ms`}</div>
      <div>{`counter: ${counter}`}</div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  deltaTime: 1000,
};
