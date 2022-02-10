import Paper from "@mui/material/Paper";
import * as d3 from "d3";
import { useChartDimensions } from "../../hooks/use_chart_dimensions";
import { useMemo, useRef, useState } from "react";
import WormAxis from "./worm_axis";
import fakeData from "./fake_data";
import { format, subDays } from "date-fns";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

var tinycolor = require("tinycolor2");

const defaultChartDisplayParams = {
    timeAxisLabels: true,
    currentTimeDisplay: false,
    minPixelsPerDay: 50,
    minDaysDisplayed: 2,
    maxDaysDisplayed: 7,

    background: {
        dayRegionColor: tinycolor("rgb(255,255,255)"),
        nightRegionColor: tinycolor("rgb(243,243,243)"),
    },

    wormSunIcon: {
        dayColor: tinycolor("rgb(250,223,79)"),
        nightColor: tinycolor("rgb(33,30,32)"),
        gradientSteps: [0.5, 1],
        radius: 20,
    },

    worm: {
        dayColor: tinycolor("#30A462"),
        nightColor: tinycolor("rgb(33,30,32)"),
        nightThreshold_W: 500,
        width: 4.3,
    },

    dayNightIcons: {
        rightMargin: 20,
        iconSpacing: 8 + 8.5,
        dayIconColor: tinycolor("rgb(243,243,243)"),
        nightIconColor: tinycolor("rgb(243,243,243)"),
        dayIconRadius: 8.5,
        nightIconRadius: 8.5,
    },

    animation: {
        time_s: 0,
    },
};

function Worm(props) {
    const styleOptions = defaultChartDisplayParams;

    const chartSettings = {
        marginLeft: 0,
        marginRight: 60,
        marginTop: 10,
        marginBottom: 30,
    };

    const parseDate = (date) => new Date(date);
    const yAccessor = (d) => d["wattage"];
    const xAccessor = (d) => parseDate(d["time"]);

    const [ref, dms] = useChartDimensions(chartSettings);

    const data = useMemo(() => {
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
            xAccessor(props.data[props.data.length - 1]),
            daysAllowed
        );

        const filteredData = props.data.filter((d) => {
            if (!d) return false;
            return xAccessor(d).getTime() >= minDate.getTime();
        });

        return filteredData;
    }, [props.data, dms.boundedWidth]);

    const yScale = useMemo(
        () =>
            d3
                .scaleLinear()
                .domain(d3.extent(data, yAccessor))
                .range([dms.boundedHeight, 0]),
        [dms.boundedHeight]
    );

    const xScale = useMemo(
        () =>
            d3
                .scaleTime()
                .domain(d3.extent(data, xAccessor))
                .range([0, dms.boundedWidth]),
        [dms.boundedWidth]
    );

    const dayNightThreshold = styleOptions.worm.nightThreshold_W;

    const lineGen = d3
        .line()
        .curve(d3.curveBasis)
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    const Sun = (props) => {
        const sunStyle = styleOptions.wormSunIcon;
        const lowAlphaSunColor = tinycolor(sunStyle.dayColor.toRgbString());
        lowAlphaSunColor.setAlpha(0);

        return (
            <svg
                //center
                x={props.x - props.width / 2}
                y={props.y - props.height / 2}
                width={props.width}
                height={props.height}
                viewBox="0 0 20 20 "
            >
                <radialGradient id="sunRadial">
                    <stop offset={0} stopColor={sunStyle.dayColor}></stop>
                    <stop offset={0.7} stopColor={sunStyle.dayColor}></stop>
                    <stop
                        offset={1}
                        stopColor={lowAlphaSunColor.toRgbString()}
                    ></stop>
                </radialGradient>
                <circle r="10" cx="10" cy="10" fill="url(#sunRadial)"></circle>
            </svg>
        );
    };

    const SunYPos = yScale(yAccessor(data[data.length - 1]));
    const SunXPos = xScale(xAccessor(data[data.length - 1]));

    return (
        <Paper
            variant={"container"}
            sx={{ p: 0, width: "400px" }}
            style={{ overflow: "hidden" }}
        >
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between">
                <Typography variant={"subtitle1"}>Productivity</Typography>
                <Typography variant={"subtitle2"}>
                    {format(new Date(), "p")}
                </Typography>
            </Stack>
            <div
                className="Chart__wrapper"
                ref={ref}
                style={{ height: "200px" }}
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
                        <stop
                            offset={0}
                            stopColor={styleOptions.worm.nightColor}
                        ></stop>
                        <stop
                            offset={0.5}
                            stopColor={styleOptions.worm.nightColor}
                        ></stop>
                        <stop
                            offset={0.5}
                            stopColor={styleOptions.worm.dayColor}
                        ></stop>
                        <stop
                            offset={1}
                            stopColor={styleOptions.worm.dayColor}
                        ></stop>
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
                        height={
                            dms.height -
                            yScale(dayNightThreshold) -
                            dms.marginTop
                        }
                        fill={styleOptions.background.nightRegionColor}
                    ></rect>

                    <g
                        transform={`translate(${[
                            dms.marginLeft,
                            dms.marginTop,
                        ].join(",")})`}
                    >
                        <path
                            d={lineGen(data)}
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

                        <g
                            transform={`translate(${[0, dms.boundedHeight].join(
                                ","
                            )})`}
                        >
                            <WormAxis
                                domain={xScale.domain()}
                                range={xScale.range()}
                                data={data}
                                xAccessor={xAccessor}
                                yAccessor={yAccessor}
                            />
                        </g>
                    </g>
                </svg>
            </div>
        </Paper>
    );
}
export default Worm;
