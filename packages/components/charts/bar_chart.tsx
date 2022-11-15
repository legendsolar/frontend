import { Box } from "@mui/material";
import * as d3 from "d3";
import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { useMemo } from "react";
import { Axis } from "./axis";
import { format, subDays, subHours, subMonths } from "date-fns";
import { useTheme } from "@mui/material";
import { Stack } from "@mui/material";
import { GenerationDatum } from "../schema/schema_gen_types";
import { subMinutes } from "date-fns";
import { useBarChartData, xAccessor, yAccessor } from "./chart_utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useThemeColor } from "../utils/use_color";
import { color } from "@mui/system";

var tinycolor = require("tinycolor2");

export enum TimeUnit {
  HOUR,
  DAY,
  MONTH,
}

export const defaultBarChartDisplayParams = {
  chartMarginSettings: {
    marginLeft: 0,
    marginRight: 60,
    marginTop: 30,
    marginBottom: 60,
  },

  chartSettings: {
    barSpacingPx: 5,
    barWidthPx: 10,
    stackedBarSpacingPx: 10,
    barCornerPx: 5,
    minDisplayBarPx: 10,
  },
  lowerBarColor: "grassGreen",
  upperBarColor: "whiteHaze",
  nightBarColor: "blackDusk",
  interpolateData: false,
  minWattageToDisplay: 10,
};

export interface BarChartProps {
  rawData: Array<GenerationDatum>;
  unit: TimeUnit;
  options: typeof defaultBarChartDisplayParams;

  loading: boolean;
  error: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({
  rawData,
  loading,
  error,
  options,
  unit,
}: BarChartProps) => {
  const chartSettings = options.chartMarginSettings;

  const { ref, dms } = useChartDimensions(chartSettings);

  const { data, max } = useBarChartData({
    rawData,
    dms,
    loading,
    error,
    pixelsPerUnit: 4,
    minUnitsDisplayed: 24,
    maxUnitsDisplayed: 24 * 3,
    subUnit: {
      [TimeUnit.HOUR]: subHours,
      [TimeUnit.DAY]: subDays,
      [TimeUnit.MONTH]: subMonths,
    }[unit],
    interpolateData: options.interpolateData,
  });

  console.log({ data });

  const gap = 100;

  const labels = data.map((d: GenerationDatum) => format(xAccessor(d), "p"));
  const yData = data.map((d: GenerationDatum) => yAccessor(d));
  const topBar = data.map((d: GenerationDatum) => max - yAccessor(d) - gap);
  const gapData = data.map((d: GenerationDatum) => gap);

  const colors = {
    lowerBar: useThemeColor(options.lowerBarColor),
    upperBar: useThemeColor(options.upperBarColor),
    nightBar: useThemeColor(options.nightBarColor),
  };

  const borderRadius = 50;
  const borderRadiusAllCorners = {
    topLeft: borderRadius,
    topRight: borderRadius,
    bottomLeft: borderRadius,
    bottomRight: borderRadius,
  };

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, max]).range([dms.boundedHeight, 0]),
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

  const renderBar = (d: GenerationDatum) => {
    if (
      Math.abs(dms.boundedHeight - yScale(yAccessor(d))) >
      options.chartSettings.minDisplayBarPx
    ) {
      return (
        <g>
          <rect
            width={options.chartSettings.barWidthPx}
            height={yScale(yAccessor(d))}
            rx={options.chartSettings.barCornerPx}
            x={xScale(xAccessor(d))}
            y={0}
            style={{ fill: colors.upperBar }}
          ></rect>

          <rect
            width={options.chartSettings.barWidthPx}
            height={
              dms.boundedHeight -
              yScale(yAccessor(d)) -
              options.chartSettings.barSpacingPx
            }
            rx={5}
            x={xScale(xAccessor(d))}
            y={yScale(yAccessor(d)) + options.chartSettings.barSpacingPx}
            style={{ fill: colors.lowerBar }}
          ></rect>
        </g>
      );
    } else {
      return (
        <g>
          <rect
            width={options.chartSettings.barWidthPx}
            height={dms.boundedHeight}
            rx={options.chartSettings.barCornerPx}
            x={xScale(xAccessor(d))}
            y={0}
            style={{ fill: colors.nightBar }}
          ></rect>
        </g>
      );
    }
  };

  return (
    <div ref={ref as any} style={{ height: "400px" }}>
      <svg width={dms.width} height={dms.height}>
        {data.map(renderBar)}

        <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
          <Axis
            domain={xScale.domain() as any}
            range={xScale.range()}
            data={data}
            xAccessor={xAccessor as any}
            yAccessor={yAccessor as any}
          />
        </g>
      </svg>
    </div>
  );
};
