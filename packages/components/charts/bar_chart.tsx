import { Stack, Box, useColorScheme, Typography } from "@mui/material";
import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { useMemo } from "react";
import { GenerationDatum } from "../schema/schema_gen_types";

import * as d3 from "d3";
import { useThemeColor } from "../utils/use_color";
import { Divider } from "../basics";

import MoonSvg from "../assets/moon_solid.svg";
import SunUp from "../assets/sun_up.svg";
import SunDown from "../assets/sun_down.svg";
import SunnyWeatherPng from "../assets/sunny_weather.png";

var tinycolor = require("tinycolor2");

export const defaultBarChartDisplayParams = {
  chartMarginSettings: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  barColor: "grassGreen",
  interpolateData: true,
  minWattageToDisplay: 10,
  barWidthPx: 8,
  barRadiusPx: 5,
};

export interface BarChartProps {
  rawData: Array<GenerationDatum>;
  options: typeof defaultBarChartDisplayParams;

  loading: boolean;
  error: boolean;
}

export const BarChart = ({
  rawData,
  loading,
  error,
  options,
}: BarChartProps) => {
  //   const { data, max } = useBarChartData({
  //     rawData,
  //     dms,
  //     loading,
  //     error,
  //     pixelsPerUnit: 4,
  //     minUnitsDisplayed: 24,
  //     maxUnitsDisplayed: 24 * 3,
  //     subUnit: subHours,
  //     interpolateData: options.interpolateData,
  //   });

  return (
    <Stack direction={"row"} width="100%">
      <BarChartDay options={options} day={"Sunday"} total={320}></BarChartDay>
      <NightBlock />
      <BarChartDay options={options} day={"Monday"} total={240}></BarChartDay>
      <NightBlock />
      <BarChartDay options={options} day={"Today"} total={32}></BarChartDay>
    </Stack>
  );
};

export interface BarChartDayProps {
  options: typeof defaultBarChartDisplayParams;
  day: string;
  total: number;
}

const BarChartDay = ({ options, day, total }: BarChartDayProps) => {
  const N = 14;

  const data = Array.from({ length: N }).map((_, i) => ({
    x: i,
    y: Math.random() * 10,
  }));

  console.log({ data });

  const yAccessor = (d) => d.y;
  const xAccessor = (d) => d.x;

  const settings = {
    ...options.chartMarginSettings,
    marginRight: options.chartMarginSettings.marginRight + options.barWidthPx,
  };

  const { ref, dms } = useChartDimensions(settings);

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, 10]).range([dms.boundedHeight, 0]),
    [dms.boundedHeight, data]
  );

  const xScale = useMemo(
    () =>
      d3
        .scaleTime()
        .domain(d3.extent(data, xAccessor) as any)
        .range([0, dms.boundedWidth]),
    [dms.boundedWidth, data]
  );

  console.log({ y: yScale(0) });

  const barColor = useThemeColor(options.barColor);
  return (
    <Stack>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"flex-end"}
      >
        <Typography variant={"smallHeadline" as any}>
          {total}
          <Typography variant={"label" as any}> KWH Total</Typography>
        </Typography>

        <Box
          sx={{ width: "24.8px", height: "20px" }}
          style={{ marginBottom: "3px" }}
          src={SunnyWeatherPng}
          component="img"
        ></Box>
      </Stack>
      <Stack spacing={"2px"}>
        <Divider></Divider>
        <svg ref={ref as any} style={{ width: "100%", height: "140px" }}>
          <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
            {data.map((d) => (
              <rect
                x={xScale(xAccessor(d))}
                width={options.barWidthPx}
                height={dms.boundedHeight - yScale(yAccessor(d))}
                y={yScale(yAccessor(d))}
                rx={options.barRadiusPx}
                ry={options.barRadiusPx}
                fill={barColor}
              ></rect>
            ))}
          </g>
        </svg>
        <Divider></Divider>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box src={SunUp} component="img"></Box>
        <Typography variant={"label" as any}>{day}</Typography>

        <Box src={SunDown} component="img"></Box>
      </Stack>
    </Stack>
  );
};

const NightBlock = () => (
  <Box
    sx={{
      backgroundColor: "whiteHaze.main",
      width: "19px",
      height: "140px",
      borderRadius: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    style={{ marginTop: "45px" }}
  >
    <Box src={MoonSvg} component="img"></Box>
  </Box>
);
