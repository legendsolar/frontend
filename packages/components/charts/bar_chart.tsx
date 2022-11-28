import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { format, subDays, subHours } from "date-fns";
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

var tinycolor = require("tinycolor2");

export const defaultBarChartDisplayParams = {
  chartMarginSettings: {
    marginLeft: 0,
    marginRight: 60,
    marginTop: 30,
    marginBottom: 60,
  },
  barColor: "pencilYellow",
  interpolateData: true,
  minWattageToDisplay: 10,
};

export interface BarChartProps {
  rawData: Array<GenerationDatum>;
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
    subUnit: subHours,
    interpolateData: options.interpolateData,
  });

  const gap = 100;

  const labels = data.map((d: GenerationDatum) => format(xAccessor(d), "p"));
  const yData = data.map((d: GenerationDatum) => yAccessor(d));
  const topBar = data.map((d: GenerationDatum) => max - yAccessor(d) - gap);
  const gapData = data.map((d: GenerationDatum) => gap);

  const colors = {
    bar: useThemeColor(options.barColor),
  };

  const borderRadius = 50;
  const borderRadiusAllCorners = {
    topLeft: borderRadius,
    topRight: borderRadius,
    bottomLeft: borderRadius,
    bottomRight: borderRadius,
  };

  return (
    <div ref={ref as any} style={{ height: "300px" }}>
      <Bar
        options={{
          events: [],
          hover: { mode: undefined },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawBorder: false,
              },
              stacked: true,
            },
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawBorder: false,
              },
              stacked: true,
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "bottom",
              data: yData,
              borderWidth: 0,
              borderRadius: borderRadiusAllCorners,
              borderSkipped: false,
              backgroundColor: colors.bar,
            },
            {
              label: "gap",
              data: gapData,
              borderWidth: 0,
              borderRadius: 0,
              borderSkipped: false,
              backgroundColor: "rgba(1,1,1,0)",
            },
            {
              label: "top",
              data: topBar,
              borderWidth: 5,
              borderRadius: borderRadiusAllCorners,
              borderSkipped: false,
              backgroundColor: "#EDEDED",
              borderColor: "#EDEDED",
            },
          ],
        }}
      ></Bar>
    </div>
  );
};
