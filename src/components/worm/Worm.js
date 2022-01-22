import { timeInterpolatedValues, simSolarOutput } from "./Utility";
import { easeInOutQuad } from "js-easing-functions";
import { addHours } from "date-fns";
import Paper from "@mui/material/Paper";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "../../Firebase";
import ProductionWorm from "./ProductionWorm";

var tinycolor = require("tinycolor2");

function Worm(props) {
    return (
        <Paper sx={{ p: 2 }}>
            <svg viewBox="0 0 200 100" style={{ border: "black 2px" }}>
                <rect></rect>
            </svg>
        </Paper>
    );
}

export default Worm;
