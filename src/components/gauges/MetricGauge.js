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
import { format } from "date-fns";

function MetricGauge(props) {
    const assetId = props.assetId;

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    let watts = 0;
    let lastUpdateTime = 0;
    let formattedDate = "";

    if (assetProdSummarySnap && !assetProdSummaryLoading) {
        watts = assetProdSummarySnap.val().recent.watts;
        lastUpdateTime = new Date(
            parseInt(assetProdSummarySnap.val().recent.time)
        );
        formattedDate = format(lastUpdateTime, "Pp");
    }

    const liveProduction_w = watts / 5000;

    const angle = 135 + liveProduction_w * 270;
    const circleRadius = 40;
    const stroke_total_l = circleRadius * Math.PI * 2;
    const stroke_l = liveProduction_w * stroke_total_l * 0.75;

    return (
        <Paper sx={{ minWidth: 275, p: 2 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6">Generation</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{format(new Date(), "p")}</Typography>
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
                                            y="-1"
                                            width="20"
                                            height="2"
                                            fill="black"
                                            transform={`rotate(${angle})`}
                                        ></rect>
                                    </g>
                                </svg>
                                <div className={styles.center}>
                                    <BoltIcon />
                                    <Typography sx={{ fontSize: 12 }}>
                                        KILOWATTS
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <Typography>{watts.toFixed(0)} kW</Typography>
                </Grid>
                <Typography sx={{ fontSize: 8 }}>
                    <div>state: {liveProduction_w}</div>;
                    <div>angle: {angle}</div>;<div>asset id: {assetId}</div>;
                </Typography>
            </Grid>
        </Paper>
    );
}
export default MetricGauge;
