import { timeInterpolatedValues, simSolarOutput } from "./Utility";
import { easeInOutQuad } from "js-easing-functions";
import { addHours } from "date-fns";
import Paper from "@mui/material/Paper";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "../../Firebase";
import ProductionWorm from "./ProductionWorm";
import * as d3 from "d3";
import { useChartDimensions } from "../../hooks/use_chart_dimensions";
import { useMemo, useRef } from "react";
import Axis from "./Axis";
import data from "./fake_data";
import { useTheme } from "@mui/material/styles";
import { style } from "@mui/system";
import styles from "./Worm.module.css";

var tinycolor = require("tinycolor2");

const defaultChartDisplayParams = {
    timeAxisLabels: true,
    currentTimeDisplay: false,

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

    const chartPath = useRef(null);

    var pathLength = 100;

    if (chartPath.current) {
        pathLength = chartPath.current.getTotalLength();
        // console.log(chartPath.getTotalLength());
    }

    const chartSettings = {
        marginLeft: 0,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 30,
    };

    const parseDate = (date) => new Date(date);
    const yAccessor = (d) => d["wattage"];
    const xAccessor = (d) => parseDate(d["time"]);

    const [ref, dms] = useChartDimensions(chartSettings);

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
        // .curve(d3.curveCardinal.tension(0.5))
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
        <Paper style={{ overflow: "hidden" }}>
            <div
                className="Chart__wrapper"
                ref={ref}
                style={{ height: "200px" }}
            >
                <style>
                    {`
                    @keyframes draw_in {
                            0% {
                            stroke-dashoffset: ${pathLength / 2};
                            }
                            100% {
                            stroke-dashoffset: 0;
                            }
                        }  
                   `}
                </style>
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
                            ref={chartPath}
                            d={lineGen(data)}
                            style={{
                                fill: "none",
                                stroke: "url(#wormGradient)",
                                strokeWidth: styleOptions.worm.width,
                                animation: "draw_in 5s",
                                animationIterationCount: "infinite",
                                strokeDasharray: pathLength,
                            }}
                            className={styles.myLine}
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
                            <Axis
                                domain={xScale.domain()}
                                range={xScale.range()}
                            />
                        </g>
                    </g>
                </svg>
            </div>
        </Paper>
    );
}
export default Worm;
