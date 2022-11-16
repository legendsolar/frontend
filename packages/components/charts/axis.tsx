// @ts-nocheck

import { useMemo } from "react";
import * as d3 from "d3";
import { isToday, format } from "date-fns";
import { GenerationDatum } from "@p/schema";
import { TimeUnit } from "./bar_chart";

export interface AxisProps {
  domain: Array<number>;
  range: Array<number>;
  data: Array<GenerationDatum>;
  xAccessor(d: GenerationDatum): number;
  yAccessor(d: GenerationDatum): Date;
  timeUnit: TimeUnit;
}

export const Axis = ({
  domain = [0, 100],
  range = [10, 290],
  data = [],
  xAccessor,
  yAccessor,
  timeUnit,
}: AxisProps) => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    const pixelsPerTick = 40;
    const tickMargin = 10;

    const ticks = {};

    // find daily max
    data.forEach((d) => {
      const date = format(
        new Date(xAccessor(d)),
        // {
        //     [TimeUnit.HOUR]: 'P',
        //     [TimeUnit.DAY]: 'M/y',
        //     [TimeUnit.MONTH]: 'y',
        // }[timeUnit],
        "d/M/y"
      );
      if (ticks[date]) {
        if (yAccessor(d) > ticks[date].yValue) {
          ticks[date].yValue = yAccessor(d);
          ticks[date].value = xAccessor(d);
          ticks[date].xOffset = xScale(xAccessor(d));
        }
      } else {
        ticks[date] = {};
        ticks[date].yValue = yAccessor(d);
        ticks[date].value = xAccessor(d);
        ticks[date].xOffset = xScale(xAccessor(d));
      }
    });

    const leftEdgeRemovedTicks = {};

    Object.entries(ticks).map(([key, tick], i, tickArray) => {
      if (tick.xOffset > pixelsPerTick + tickMargin) {
        if (
          i >= tickArray.length - 1 ||
          Math.abs(tick.xOffset - tickArray[i + 1][1].xOffset) > pixelsPerTick
        ) {
          leftEdgeRemovedTicks[key] = tick;
        }
      }
    });

    return leftEdgeRemovedTicks;
  }, [domain.join("-"), range.join("-"), data]);

  const tickArray = Object.entries(ticks);

  const getTickString = (date, index) => {
    if (isToday(date) && index === tickArray.length - 1) {
      return "Today";
    }

    return format(date, "EEEE");
  };

  return (
    <svg>
      {tickArray.map(([key, tick], index) => (
        <g
          key={tick.value.getTime()}
          transform={`translate(${tick.xOffset}, 0)`}
        >
          <text
            key={tick.value.getTime()}
            style={{
              fontSize: "12px",
              fontFamily: "Be Vietnam Pro",
              textAnchor: "middle",
              transform: "translateY(40px)",
              fontWeight: index === tickArray.length - 1 ? "bold" : "normal",
            }}
          >
            {getTickString(tick.value, index)}
          </text>
        </g>
      ))}
    </svg>
  );
};
