import { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { useInterval } from "@project/hooks/use_interval";

const meta: Meta = {
  title: "Interval Test",
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

  const [counterTab, setCounterTab] = useState(0);

  useInterval(
    () => {
      setCounterTab(counterTab + 1);
    },
    deltaTime,
    true
  );

  return (
    <div>
      <div>{`updates every ${deltaTime}ms`}</div>
      <div>{`counter, doesn't care about tabs: ${counter}`}</div>
      <div>{`counter, does care about tabs: ${counterTab}`}</div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  deltaTime: 500,
};
