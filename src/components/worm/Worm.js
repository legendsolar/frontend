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
        marginTop: 0,
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

    return (
        <Paper sx={{ p: 2 }}>
            <div
                className="Chart__wrapper"
                ref={ref}
                style={{ height: "200px" }}
            >
                <svg width={dms.width} height={dms.height}>
                    <g
                        transform={`translate(${[
                            dms.marginLeft,
                            dms.marginTop,
                        ].join(",")})`}
                    >
                        <rect
                            width={dms.width}
                            height={dms.boundedHeight}
                            fill="lavender"
                        />

                        <rect
                            x="0"
                            width={dms.width}
                            y={yScale(darkWattThreshold)}
                            height={
                                dms.boundedHeight - yScale(darkWattThreshold)
                            }
                            fill="#EEE"
                        ></rect>

                        <path
                            d={lineGen(data)}
                            style={{
                                fill: "none",
                                stroke: "#111",
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
