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
import BoltIcon from "@mui/icons-material/Bolt";
import styles from "./MetricGauge.module.css";

function MetricGauge(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

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
    const circleRadius = 40;
    const stroke_total_l = circleRadius * Math.PI * 2;
    const stroke_l = liveProduction_w * stroke_total_l * 0.75;

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>Generation</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>1:32 PM</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" direction="row">
                        <Grid item>
                            <div className={styles.gauge}>
                                <svg
                                    className={styles.svgElement}
                                    viewBox="0 0 110 110"
                                >
                                    <g className={styles.centerTransform}>
                                        <g className={styles.filledArcs}>
                                            <circle
                                                className={styles.background}
                                                r={circleRadius}
                                            />
                                            <circle
                                                className={styles.highlight}
                                                r={circleRadius}
                                                stroke-dasharray={`${stroke_l} ${stroke_total_l}`}
                                            />
                                        </g>

                                        <g className={styles.arcOutline}>
                                            <circle
                                                r={circleRadius - 10}
                                            ></circle>
                                            <circle
                                                r={circleRadius + 10}
                                            ></circle>
                                        </g>

                                        <rect
                                            x="30"
                                            y="-2"
                                            width="20"
                                            height="4"
                                            fill="black"
                                            transform={`rotate(${angle})`}
                                        ></rect>
                                    </g>
                                </svg>
                                <div className={styles.center}>
                                    <BoltIcon />
                                    <Typography>KILOWATTS</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <Typography>95 kW</Typography>
                </Grid>
                <div>State: {liveProduction_w}</div>;<div>Angle: {angle}</div>;
                <div>circle: {stroke_total_l}</div>
            </Grid>
        </Paper>
    );
}
export default MetricGauge;
