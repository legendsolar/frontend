import { Stack, Box, Typography } from "@mui/material";
import { useChartDimensions } from "@project/hooks/use_chart_dimensions";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import PartlyCloudyLottieJson from "../assets/weather_icons/partly_cloudy_day/data.json";
import * as d3 from "d3";
import { useThemeColor } from "../utils/use_color";
import { Divider } from "../basics";

import { Player } from "@lottiefiles/react-lottie-player";

import MoonSvg from "../assets/moon_solid.svg";
import SunUp from "../assets/sun_up.svg";
import SunDown from "../assets/sun_down.svg";
import { defined, watts_kW } from "@p/utils";
import { Bar } from "./chart_utils";
import { format } from "date-fns";
import { defaultBarChartDisplayParams } from "./bar_chart";

export interface BarChartDayProps {
  data: Array<Bar>;
  options: typeof defaultBarChartDisplayParams;
  day: string;
  max: number;
  total_kWh: number;
  highlighted: boolean;
  defaultHighlightMostRecentBar: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BarChartDay = ({
  options,
  day,
  total_kWh,
  data,
  max,
  highlighted,
  defaultHighlightMostRecentBar,
  onMouseEnter,
  onMouseLeave,
}: BarChartDayProps) => {
  const lastNonUndefinedValue = data.findLastIndex(
    (bar, i) => defined(bar.wattage) && !defined(data[i + 1]?.wattage)
  );

  const [barHoverState, setBarHoverState] = useState<number | undefined>(
    defaultHighlightMostRecentBar ? lastNonUndefinedValue : undefined
  );

  const xFormedData = Array.from({ length: 14 }).map((_, i) => ({
    x: i,
    y: data[i].wattage,
    ...data[i],
  }));

  const yAccessor = (d) => d.y;
  const xAccessor = (d) => d.x;

  const settings = {
    ...options.chartMarginSettings,
    marginRight: options.chartMarginSettings.marginRight + options.barWidthPx,
  };

  const { ref, dms } = useChartDimensions(settings);

  const yScale = useMemo(
    () => d3.scaleLinear().domain([0, max]).range([dms.boundedHeight, 0]),
    [dms.boundedHeight, xFormedData]
  );

  const xScale = useMemo(
    () =>
      d3
        .scaleTime()
        .domain(d3.extent(xFormedData, xAccessor) as any)
        .range([0, dms.boundedWidth]),
    [dms.boundedWidth, xFormedData]
  );

  const barColor = useThemeColor(options.barColor);
  const textColor = useThemeColor(options.textColor);

  const HighLightText = ({ d }: { d: Bar }) => {
    const [textWidth, setTextWidth] = useState(0);

    const xPos = xScale(xAccessor(d));

    const rightJustify =
      Math.abs(dms.boundedWidth - xPos) >
      textWidth + options.highlightedTextMarginPx + 3;

    const ref = useRef<SVGTextElement | undefined>(undefined);

    useLayoutEffect(() => {
      if (ref.current?.getBBox().width) {
        setTextWidth(ref.current.getBBox().width);
      }
    }, []);

    return (
      <g
        transform={`translate(
                        ${xPos + (rightJustify ? options.barWidthPx : 0)}, ${
          dms.marginTop - 3
        })`}
      >
        <text
          style={{
            fontSize: "10px",
            fontFamily: "Be Vietnam Pro",
            textAnchor: rightJustify ? "start" : "end",
            fontWeight: 500,
          }}
          fill={textColor}
          ref={ref}
        >
          {`${format(d.startTime, "haaa")}-${format(d.endTime, "h:mmaaa")}`}
        </text>
        <circle
          fill={barColor}
          r={3}
          cy={-3}
          cx={
            rightJustify
              ? textWidth + options.highlightedTextMarginPx
              : -textWidth - options.highlightedTextMarginPx
          }
        ></circle>
      </g>
    );
  };

  const totalFormatted = watts_kW.formatWithUnit(total_kWh);

  const MouseOverDataDisplay = ({ d }: { d: Bar }) => {
    return (
      <g>
        <line
          x1={xScale(xAccessor(d)) + options.barWidthPx / 2}
          x2={xScale(xAccessor(d)) + options.barWidthPx / 2}
          y1={0}
          y2={dms.height}
          stroke={textColor}
          strokeWidth={1}
          strokeLinecap={"round"}
        ></line>
        <HighLightText d={d} />
      </g>
    );
  };

  return (
    <Stack>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"flex-end"}
      >
        <Typography variant={"smallHeadline" as any}>
          {totalFormatted.value}
          <Typography variant={"label" as any}>
            {" "}
            {totalFormatted.unit}H Total
          </Typography>
        </Typography>

        <Player
          autoplay
          loop
          speed={0.5}
          src={PartlyCloudyLottieJson}
          style={{ height: "30px", width: "34.8px" }}
        ></Player>
      </Stack>
      <Stack
        spacing={"2px"}
        sx={{ opacity: highlighted ? 1 : options.nonHighlightedOpacity }}
        style={{ marginTop: "0px" }}
      >
        <Divider></Divider>
        <svg
          ref={ref as any}
          style={{ width: "100%", height: "140px" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <g transform={`translate(${dms.marginLeft}, 0)`}>
            {xFormedData.map(
              (d, i) =>
                defined(d.wattage) && (
                  <g
                    key={i}
                    onMouseEnter={() => {
                      setBarHoverState(i);
                    }}
                    onMouseLeave={() => {
                      setBarHoverState(undefined);
                    }}
                  >
                    {(barHoverState === i ||
                      (defaultHighlightMostRecentBar &&
                        i === lastNonUndefinedValue &&
                        !defined(barHoverState))) &&
                      highlighted && <MouseOverDataDisplay d={d} />}

                    <rect
                      transform={`translate(0, ${dms.marginTop})`}
                      x={xScale(xAccessor(d))}
                      width={options.barWidthPx}
                      height={dms.boundedHeight - (yScale(yAccessor(d)) - 2)}
                      y={yScale(yAccessor(d)) - 2}
                      rx={options.barRadiusPx}
                      ry={options.barRadiusPx}
                      fill={barColor}
                      opacity={
                        barHoverState === i ||
                        !highlighted ||
                        (defaultHighlightMostRecentBar &&
                          i === lastNonUndefinedValue &&
                          !defined(barHoverState))
                          ? 1
                          : options.nonHighlightedOpacity
                      }
                    ></rect>

                    <rect
                      x={xScale(xAccessor(d))}
                      width={dms.boundedWidth / xFormedData.length + 1}
                      height={dms.height}
                      y={0}
                      fill={
                        barHoverState === i
                          ? "rgba(0,0,0,0.0)"
                          : "rgba(0,0,0,0)"
                      }
                    ></rect>
                  </g>
                )
            )}
          </g>
        </svg>
        <Divider></Divider>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          style={{ marginTop: "4px" }}
        >
          <Box src={SunUp} component="img"></Box>
          <Typography variant={"label" as any}>{day}</Typography>

          <Box src={SunDown} component="img"></Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const NightBlock = () => (
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
    style={{ marginTop: "34px" }}
  >
    <Box src={MoonSvg} component="img"></Box>
  </Box>
);
