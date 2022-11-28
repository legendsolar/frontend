import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  RecentTransfersComponent,
  RecentTransfersComponentProps,
} from "@project/components/transfers";

import { DisplayTransfer } from "@project/components/transfers/types";
import { AccountType, Transfer, TransferStatus, TransferType } from "@p/schema";

const meta: Meta = {
  title: "Recent Transfers",
  component: RecentTransfersComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<RecentTransfersComponentProps> = (args) => (
  <RecentTransfersComponent {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  transfers: [
    {
      amount: "$10.99",
      date: "6/10/2022",
      title: "Dividend Payment",
      destinationName: "Legends Wallet",
      sourceName: "Solar Holdings",
      color: "blackDusk",
      statusName: "Complete",
      type: TransferType.Dividend,
    },

    {
      amount: "$10.99",
      date: "6/10/2022",
      title: "Dividend Payment",
      destinationName: "Legends Wallet",
      sourceName: "Solar Holdings",
      color: "blackDusk",
      statusName: "Complete",
      type: TransferType.Dividend,
    },

    {
      amount: "$10.99",
      date: "6/10/2022",
      title: "Dividend Payment",
      destinationName: "Legends Wallet",
      sourceName: "Solar Holdings",
      color: "blackDusk",
      statusName: "Complete",
      type: TransferType.Dividend,
    },
  ],
  loading: false,
  widgetMode: true,
  title: "Dividends",
  maxTransferNumberToDisplay: 2,
  onViewAllTransfers: () => {},
} as RecentTransfersComponentProps;
