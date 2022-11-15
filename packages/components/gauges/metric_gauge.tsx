import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { LivePill } from "../pills/live_pill";
import { useChartDimensions } from "../hooks/use_chart_dimensions";
import { Component } from "../basics/component";
import { Unit } from "@p/utils/units";
import { useThemeColor } from "../utils/use_color";

export interface MetricGaugeProps {
  min: number;
  max: number;
  currentValue: number;
  title: string;
  unit: Unit;

  arcWidth?: number;
  gaugeAngleTravel?: number;
  error?: string;
  message?: string;
}

export const MetricGauge = ({
  min,
  max,
  currentValue,
  unit,
  message = "",
  circleRadius = 150 - 45,
  arcWidth = 90,
  gaugeAngleTravel = 180,
  error,
  title,
}: MetricGaugeProps) => {
  const { ref, dms } = useChartDimensions({
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  });

  const color = useThemeColor(unit.color);

  const normalizedCurrentValue = error
    ? 0.5
    : (currentValue - min) / (max - min);

  const currentAngle = error
    ? 270
    : 180 + normalizedCurrentValue * gaugeAngleTravel;

  const outerCircleRadius = circleRadius + arcWidth / 2;

  const radiusFromHeight =
    outerCircleRadius < dms.height ? outerCircleRadius : dms.height;
  const radiusFromWidth =
    outerCircleRadius * 2 < dms.width ? outerCircleRadius : dms.width / 2;

  const currentCircleOuterRadius = Math.min(radiusFromHeight, radiusFromWidth);

  const currentCircleRadius = currentCircleOuterRadius - arcWidth / 2;
  const currentCircleInnerRadius = currentCircleOuterRadius - arcWidth;

  const strokeTotalLength = currentCircleRadius * Math.PI * 2;
  const strokeCurrentLength =
    normalizedCurrentValue * strokeTotalLength * (gaugeAngleTravel / 360.0);

  const getGaugeNumber = () => {
    if (currentCircleInnerRadius > 20) {
      return error ? "--" : unit.format(currentValue, false, 3);
    }

    return "";
  };

  return (
    <Component shadow resize={true}>
      <Stack alignItems={"center"}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ mb: 3, width: "100%" }}
        >
          <Typography variant={"smallHeadline" as any}>{title}</Typography>
          <LivePill error={error ? error : ""}></LivePill>
        </Stack>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 150,

            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <svg
            ref={ref as any}
            style={{
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <g
              style={{
                transform: `translate(${currentCircleOuterRadius}px,100%)`,
              }}
            >
              <g
                style={{
                  transform: "rotate(180deg)",
                  fill: "none",
                  strokeWidth: arcWidth,
                }}
              >
                <circle
                  style={{
                    stroke: "#F4F5f5",
                  }}
                  r={currentCircleRadius}
                />
                <circle
                  stroke={color}
                  r={currentCircleRadius}
                  stroke-dasharray={`${strokeCurrentLength} ${strokeTotalLength}`}
                />
              </g>
              <rect
                x={currentCircleRadius - arcWidth / 2}
                y="-2"
                width={arcWidth}
                height="4"
                fill="black"
                transform={`rotate(${currentAngle})`}
              ></rect>
            </g>
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",

              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Typography
              variant={"headline1" as any}
              sx={{
                mt: "auto",
                lineHeight: currentCircleInnerRadius - 10 + "px",
                fontSize: currentCircleInnerRadius - 3 + "px",
              }}
            >
              {getGaugeNumber()}
            </Typography>
          </div>
        </div>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: 1,
            width: "100%",
            maxWidth: "300px",
          }}
        >
          <Typography variant={"subtitle3" as any}>
            {error ? `${unit.unit}-` : unit.format(min)}
          </Typography>

          <Stack alignItems={"center"} justifyContent={"flex-start"}>
            <Typography variant="subtitle1">{unit.unitDescription}</Typography>

            {unit.unitSubHeading && (
              <Typography variant={"label" as any}>
                {unit.unitSubHeading}
              </Typography>
            )}
          </Stack>

          <Typography variant={"subtitle3" as any}>
            {error ? `${unit.unit}-` : unit.format(max)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="end"
          sx={{
            mt: 3,
            width: "100%",
          }}
        >
          <Typography variant={"label" as any} sx={{ ml: "auto" }}>
            {message}
          </Typography>
        </Stack>
      </Stack>
    </Component>
  );
};
