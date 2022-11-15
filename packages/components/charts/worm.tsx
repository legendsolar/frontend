import { Box } from "@mui/material";
import * as d3 from "d3";
import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { useMemo } from "react";
import { Axis } from "./axis";
import { format, subDays } from "date-fns";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { GenerationDatum } from "../schema/schema_gen_types";
import { subMinutes } from "date-fns";

var tinycolor = require("tinycolor2");

export const defaultChartDisplayParams = {
  timeAxisLabels: true,
  currentTimeDisplay: true,
  minPixelsPerDay: 50,
  minDaysDisplayed: 2,
  maxDaysDisplayed: 7,

  background: {
    dayRegionColor: tinycolor("rgb(235,235,235)").toRgbString(),
    nightRegionColor: tinycolor("rgb(244,243,243)").toRgbString(),
  },

  wormSunIcon: {
    dayColor: tinycolor("rgb(250,223,79)").toRgbString(),
    nightColor: tinycolor("rgb(33,30,32)").toRgbString(),
    gradientSteps: [0.5, 1],
    radius: 30,
  },

  worm: {
    dayColor: tinycolor("#30A462").toRgbString(),
    nightColor: tinycolor("rgb(33,30,32)").toRgbString(),
    nightThreshold_W: 500,
    width: 6.3,
  },

  dayNightIcons: {
    rightMargin: 20,
    iconSpacing: 8 + 8.5,
    dayIconColor: tinycolor("rgb(243,243,243)").toRgbString(),
    nightIconColor: tinycolor("rgb(243,243,243)").toRgbString(),
    dayIconRadius: 8.5,
    nightIconRadius: 8.5,
  },

  animation: {
    time_s: 0,
  },

  chartMarginSettings: {
    marginLeft: 0,
    marginRight: 60,
    marginTop: 30,
    marginBottom: 60,
  },
};

export interface WormProps {
  rawData: Array<GenerationDatum>;
  loading: boolean;
  error: boolean;
  nightThreshold_W: number;
  max_W: number;
  sx?: any;

  styleOptions?: typeof defaultChartDisplayParams;
}

export const Worm = ({
  rawData,
  loading,
  error,
  styleOptions = defaultChartDisplayParams,
  max_W,
  sx,
}: WormProps) => {
  const chartSettings = styleOptions.chartMarginSettings;

  const parseDate = (date: string) => new Date(date);
  const yAccessor = (d: GenerationDatum) => d.wattage;
  const xAccessor = (d: GenerationDatum) => parseDate(d.time);

  const { ref, dms } = useChartDimensions(chartSettings);

  const data = useMemo<Array<GenerationDatum>>(() => {
    if (loading || error) {
      return [
        {
          time: "0",
          wattage: 0,
        },
      ];
    }

    const daysAllowed = Math.min(
      Math.max(
        Math.floor(
          (dms.boundedWidth -
            chartSettings.marginLeft -
            chartSettings.marginRight) /
            styleOptions.minPixelsPerDay
        ),
        styleOptions.minDaysDisplayed
      ),
      styleOptions.maxDaysDisplayed
    );

    const minDate = subDays(
      xAccessor(rawData[rawData.length - 1]),
      daysAllowed
    );

    const filteredData = rawData
      .filter((d) => {
        if (!d) return false;
        return xAccessor(d).getTime() >= minDate.getTime();
      })
      // if data is coming in out of order?
      .sort((a, b) => xAccessor(a).getTime() - xAccessor(b).getTime());

    /**
     * Add a tiny bit of data before the min date to
     * ensure a smooth worm transition to edge
     */

    filteredData.unshift({
      time: subMinutes(new Date(filteredData[0].time), 1).toISOString(),
      wattage: filteredData[0].wattage,
    });

    return filteredData;
  }, [rawData, loading, error, dms.boundedWidth]);

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, max_W]).range([dms.boundedHeight, 0]),
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

  const dayNightThreshold = styleOptions.worm.nightThreshold_W;

  const lineGen = d3
    .line()
    .curve(d3.curveBasis)
    .x((d) => xScale(xAccessor(d as any)))
    .y((d) => yScale(yAccessor(d as any)));

  const Sun = ({
    width,
    height,
    x,
    y,
  }: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => {
    const sunStyle = styleOptions.wormSunIcon;
    const lowAlphaSunColor = tinycolor(sunStyle.dayColor);
    lowAlphaSunColor.setAlpha(0);

    return (
      <svg
        //center
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        viewBox="0 0 20 20 "
      >
        <radialGradient id="sunRadial">
          <stop offset={0} stopColor={sunStyle.dayColor}></stop>
          <stop offset={0.7} stopColor={sunStyle.dayColor}></stop>
          <stop offset={1} stopColor={lowAlphaSunColor.toRgbString()}></stop>
        </radialGradient>
        <circle r="10" cx="10" cy="10" fill="url(#sunRadial)"></circle>
      </svg>
    );
  };

  const SunYPos = yScale(yAccessor(data[data.length - 1]));
  const SunXPos = xScale(xAccessor(data[data.length - 1]));

  const lastTime = xAccessor(data[data.length - 1]);

  return (
    <Box sx={{ p: 0, width: "100%", overflow: "hidden", ...sx }}>
      <Stack sx={{ p: 4 }} direction="row" justifyContent="space-between">
        <Typography variant={"smallHeadline" as any}>Productivity</Typography>

        {styleOptions.currentTimeDisplay && (
          <Typography variant={"body1"}>{format(lastTime, "h a")}</Typography>
        )}
      </Stack>
      <div
        className="Chart__wrapper"
        ref={ref as any}
        style={{ height: "180px" }}
      >
        <svg width={dms.width} height={dms.height}>
          <linearGradient
            id="wormGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={yScale(dayNightThreshold - 10)}
            y2={yScale(dayNightThreshold + 10)}
          >
            <stop offset={0} stopColor={styleOptions.worm.nightColor}></stop>
            <stop offset={0.5} stopColor={styleOptions.worm.nightColor}></stop>
            <stop offset={0.5} stopColor={styleOptions.worm.dayColor}></stop>
            <stop offset={1} stopColor={styleOptions.worm.dayColor}></stop>
          </linearGradient>

          <rect
            width={dms.width}
            height={dms.height}
            fill={styleOptions.background.dayRegionColor}
          />

          <rect
            x="0"
            width={dms.width}
            y={yScale(dayNightThreshold) + dms.marginTop}
            height={dms.height - yScale(dayNightThreshold) - dms.marginTop}
            fill={styleOptions.background.nightRegionColor}
          ></rect>

          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            <path
              d={lineGen(data as any) as any}
              style={{
                fill: "none",
                stroke: "url(#wormGradient)",
                strokeWidth: styleOptions.worm.width,
              }}
            ></path>

            <Sun
              x={SunXPos}
              y={SunYPos}
              width={styleOptions.wormSunIcon.radius}
              height={styleOptions.wormSunIcon.radius}
            ></Sun>

            {styleOptions.timeAxisLabels && (
              <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
                <Axis
                  domain={xScale.domain() as any}
                  range={xScale.range()}
                  data={data}
                  xAccessor={xAccessor as any}
                  yAccessor={yAccessor as any}
                />
              </g>
            )}
          </g>
        </svg>
      </div>
    </Box>
  );
};
