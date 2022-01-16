import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../../Firebase";
import { ref } from "firebase/database";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import useInterval from "../../hooks/use_interval";
import { useObject } from "react-firebase-hooks/database";

function MetricGauge(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    console.log("assets");

    const [liveProduction_w, setLiveProduction_w] = useState(0);

    if (!assetProdSummaryLoading && !assetProdError) {
        // setLiveProduction_w(assetProdSummarySnap.recent.watts);
    }

    useInterval(() => {
        if (liveProduction_w > 1) {
            setLiveProduction_w(0);
        } else {
            setLiveProduction_w(liveProduction_w + 0.004);
        }
    }, 30);

    const angle = 135 + liveProduction_w * 270;
    const circle_r = 60;
    const stroke_total_l = circle_r * Math.PI * 2;
    const stroke_l = liveProduction_w * stroke_total_l * 0.75;

    return (
        <Paper sx={{ minWidth: 275 }}>
            <svg style={{ border: "2px solid gold" }}>
                <g style={{ transform: "translate(50%, 50%)" }}>
                    <g stroke-width="8%" fill="none" transform="rotate(135)">
                        <circle cx="0%" cy="0%" r="25%" stroke="#0000FF" />
                        <circle
                            cx="0"
                            cy="0"
                            r="60"
                            stroke-dasharray={`${stroke_l} ${stroke_total_l}`}
                            stroke="#FF0000"
                        />
                    </g>

                    <g stroke-width="2px">
                        <circle
                            fill="none"
                            stroke="black"
                            cx="0%"
                            cy="0%"
                            r="50"
                        ></circle>
                        <circle
                            fill="none"
                            stroke="black"
                            cx="0%"
                            cy="0%"
                            r="70"
                        ></circle>
                    </g>

                    <rect
                        x="50"
                        y="-2"
                        width="20"
                        height="4"
                        fill="green"
                        transform={`rotate(${angle})`}
                    ></rect>
                </g>
            </svg>
            <div>State: {liveProduction_w}</div>;<div>Angle: {angle}</div>;
            <div>circle: {stroke_total_l}</div>
        </Paper>
    );
}
export default MetricGauge;
