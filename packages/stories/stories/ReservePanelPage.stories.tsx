import { Meta, Story } from "@storybook/react";
import {
  ReservePanelPage,
  ReservePanelPageProps,
} from "@project/components/pages/reserve_panel_page";
import { useState } from "react";

const meta: Meta = {
  title: "Pages/Reserve Panel Page",
  component: ReservePanelPage,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ReservePanelPageProps> = (args) => {
  const [panels, setPanelsInternal] = useState(args.currentPanels);

  return (
    <ReservePanelPage
      {...{
        ...args,
        currentPanels: panels,
        setCurrentPanels: (panels) => setPanelsInternal(panels),
      }}
    />
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  confirmPanels: () => {},
  costPerPanel: 250,
  currentPanels: 1,
  currentReservedPanels: 8000,
  maxPanelReservations: 20000,
} as ReservePanelPageProps;
