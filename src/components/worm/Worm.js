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

var tinycolor = require("tinycolor2");

function Worm(props) {
    const [ref, dms] = useChartDimensions(chartSettings);
    // todo not ideal

    const parseDate = (date) => new Date(date);
    const yAccessor = (d) => d["wattage"];
    const xAccessor = (d) => parseDate(d["time"]);

    let dimWrapper = {
        width: 400,
        height: 200,
        margins: {
            top: 0,
            right: 0,
            bottom: 50,
            left: 0,
        },
    };

    let dimBound = {
        width:
            dimWrapper.width -
            dimWrapper.margins.left -
            dimWrapper.margins.right,

        height:
            dimWrapper.height -
            dimWrapper.margins.top -
            dimWrapper.margins.bottom,
    };

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimBound.height, 0]);

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimBound.width]);

    const lineGen = d3
        .line()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    return (
        <Paper sx={{ p: 2 }}>
            <svg
                width={dimWrapper.width}
                height={dimWrapper.height}
                style={{ border: "1px red" }}
            >
                <g
                    style={{
                        transform: `translate(
                    ${dimWrapper.margins.left},
                    ${dimWrapper.margins.top}
                )`,
                    }}
                ></g>

                <rect
                    x="0"
                    width={dimBound.width}
                    y={yScale(1000)}
                    height={dimBound.height - yScale(1000)}
                    fill="#EEE"
                ></rect>

                <path
                    d={lineGen(data)}
                    style={{ fill: "none", stroke: "#111", strokeWidth: 1 }}
                ></path>
            </svg>
        </Paper>
    );
}

const data = [
    {
        time: 1641622500000,
        wattage: 0,
    },

    {
        time: 1641672900000,
        wattage: 5000,
    },

    {
        time: 1641764700000,
        wattage: 0,
    },

    {
        time: 1642194900000,
        wattage: 4000,
    },
];

export default Worm;
