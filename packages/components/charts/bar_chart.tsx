import { Stack } from "@mui/material";
import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { useEffect, useState } from "react";
import { GenerationDatum, Location } from "../schema/schema_gen_types";
import { useBarChartData } from "./chart_utils";
import { BarChartDay, NightBlock } from "./bar_chart_day";
import { format } from "date-fns";

export const defaultBarChartDisplayParams = {
  chartMarginSettings: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 15,
    marginBottom: 0,
  },
  barColor: "grassGreen",
  textColor: "blackDawn",
  nonHighlightedOpacity: 0.5,
  interpolateData: true,
  minWattageToDisplay: 10,
  highlightedTextMarginPx: 5,
  minChartWidthPx: 190,
  barWidthPx: 8,
  barRadiusPx: 5,
};

export interface BarChartProps {
  rawData: Array<GenerationDatum>;
  location: Location;
  options: typeof defaultBarChartDisplayParams;
  loading: boolean;
  error: boolean;
}

export const BarChart = ({ options, rawData, location }: BarChartProps) => {
  const { ref, dms } = useChartDimensions({
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  });

  const daysToDisplay = Math.min(
    3,
    Math.floor(dms.boundedWidth / options.minChartWidthPx)
  );

  const { dayBars, max } = useBarChartData({
    rawData,
    loading: false,
    error: false,
    daysToDisplay,
    barsPerDay: 14,
    location: location,
    timezone: "-5:00",
  });

  const [highlightedChartState, setHighlightedChartState] = useState<number>(
    dayBars.length - 1
  );

  useEffect(() => {
    setHighlightedChartState(dayBars.length - 1);
  }, [daysToDisplay]);

  const handleChartEnter = (chartIdx: number) => {
    setHighlightedChartState(chartIdx);
  };
  const handleChartLeave = (chartIdx: number) => {
    setHighlightedChartState(dayBars.length - 1);
  };

  console.log({ dayBars, max });

  return (
    <Stack direction={"row"} ref={ref}>
      {dayBars.map(({ bars, day, total_kWh }, i) => (
        <Stack direction={"row"} key={i}>
          <BarChartDay
            data={bars}
            options={options}
            day={format(day, "EEEE")}
            total_kWh={total_kWh}
            max={max}
            defaultHighlightMostRecentBar={
              i === highlightedChartState && i === dayBars.length - 1
            }
            highlighted={i === highlightedChartState}
            onMouseEnter={() => handleChartEnter(i)}
            onMouseLeave={() => handleChartLeave(i)}
          ></BarChartDay>
          {i !== dayBars.length - 1 && <NightBlock />}
        </Stack>
      ))}
    </Stack>
  );
};
