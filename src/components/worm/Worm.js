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
import { useMemo } from "react";
import Axis from "./Axis";
import data from "./fake_data";

var tinycolor = require("tinycolor2");

function Worm(props) {
    const chartSettings = {
        marginLeft: 0,
        marginRight: 40,
        marginTop: 20,
        marginBottom: 30,
    };

    // todo not ideal

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

    const darkWattThreshold = 500;

    const lineGen = d3
        .line()
        .curve(d3.curveBasis)
        // .curve(d3.curveCardinal.tension(0.5))
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    const Sun = (props) => {
        return (
            <svg
                //center
                x={props.x - props.width / 2}
                y={props.y - props.height / 2}
                width={props.width}
                height={props.height}
                viewBox="0 0 20 20 "
            >
                <circle r="10" cx="10" cy="10"></circle>
            </svg>
        );
    };

    const SunYPos = yScale(yAccessor(data[data.length - 1]));
    const SunXPos = xScale(xAccessor(data[data.length - 1]));
    console.log(data[data.length - 1]);
    console.log(SunYPos, SunXPos);

    return (
        <Paper sx={{ p: 2 }}>
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
                        y1={yScale(darkWattThreshold - 10)}
                        y2={yScale(darkWattThreshold + 10)}
                    >
                        <stop offset={0} stopColor="blue"></stop>
                        <stop offset={0.5} stopColor="blue"></stop>
                        <stop offset={0.5} stopColor="red"></stop>
                        <stop offset={1} stopColor="red"></stop>
                    </linearGradient>

                    <rect
                        width={dms.width}
                        height={dms.height}
                        fill="lavender"
                    />

                    <rect
                        x="0"
                        width={dms.width}
                        y={yScale(darkWattThreshold) + dms.marginTop}
                        height={
                            dms.height -
                            yScale(darkWattThreshold) -
                            dms.marginTop
                        }
                        fill="#EEE"
                    ></rect>

                    <g
                        transform={`translate(${[
                            dms.marginLeft,
                            dms.marginTop,
                        ].join(",")})`}
                    >
                        <Sun
                            x={SunXPos}
                            y={SunYPos}
                            width={20}
                            height={20}
                        ></Sun>
                        <path
                            d={lineGen(data)}
                            style={{
                                fill: "none",
                                stroke: "url(#wormGradient)",
                                strokeWidth: 3,
                            }}
                        ></path>
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
