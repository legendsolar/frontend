import { Meta, Story } from "@storybook/react";
import { MapTerrain3D } from "@project/components/map/map_terrain_3d";
import { TooltipMarker } from "@project/components/map/tooltip_marker";
import { Component } from "@project/components/basics/component";

const meta: Meta = {
  title: "Map 3D Test",
  argTypes: {},
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<{ lat: number; lng: number }> = ({ lat, lng }) => {
  return (
    <Component
      standardWidth={false}
      sx={{
        height: "320px",
        width: "100%",
        m: 0,
        p: 0,
        overflow: "hidden",
      }}
    >
      <MapTerrain3D
        lat={lat}
        lng={lng}
        width={"100%"}
        height={"320px"}
        zoom={13}
        initBearing={0}
        markers={[
          <TooltipMarker
            location={{ lat, lng }}
            title={"Map Marker"}
          ></TooltipMarker>,
        ]}
      ></MapTerrain3D>
    </Component>
  );
};

export const Default = Template.bind({});

Default.args = {
  lat: 41.375094,
  lng: -74.692663,
};
