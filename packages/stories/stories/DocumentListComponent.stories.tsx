import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  DocumentListComponent,
  Document,
  DocumentListComponentProps,
} from "@project/components/documents";

const meta: Meta = {
  title: "Document List",
  component: DocumentListComponent,
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DocumentListComponentProps> = (args) => (
  <DocumentListComponent {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  documents: [
    {
      id: "test id",
      name: "First Doc",
      type: "Type",
      created: new Date(),
      facility: "Facility",
      downloadLink: "",
    } as Document,
    {
      id: "test id",
      name: "Second Doc",
      type: "Type",
      created: new Date(),
      facility: "Facility",
      downloadLink: "",
    } as Document,
  ],
} as DocumentListComponentProps;
