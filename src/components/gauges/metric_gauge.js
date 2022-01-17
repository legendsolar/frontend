import React from "react";
import { auth, database, firebaseApp } from "../../Firebase";
import { ref } from "firebase/database";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";
import styles from "./metric_gauge.module.css";
import { format } from "date-fns";
import LivePill from "../pills/live_pill";

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
    const gaugeAngleTravel = 176;

    const angle = 182 + liveProduction_w * gaugeAngleTravel;
    const circleRadius = 75;
    const stroke_total_l = circleRadius * Math.PI * 2;
    const stroke_l =
        liveProduction_w * stroke_total_l * ((gaugeAngleTravel + 2) / 360);
    const arc_width = 50;
    console.log(styles.filledArcs);

    return (
        <Paper sx={{ minWidth: 275, p: 2 }}>
            <Grid container width="200">
                <Grid item>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="dashboardHeader">
                                Generation
                            </Typography>
                        </Grid>
                        <Grid item>
                            <LivePill></LivePill>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <div className={styles.gauge}>
                        <svg
                            className={styles.svgElement}
                            viewBox="0 0 200 100"
                        >
                            <g className={styles.centerTransform}>
                                <g
                                    className={styles.filledArcs}
                                    style={{ strokeWidth: arc_width }}
                                >
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
                                <rect
                                    x={circleRadius - arc_width / 2}
                                    y="-2"
                                    width={arc_width}
                                    height="4"
                                    fill="black"
                                    transform={`rotate(${angle})`}
                                ></rect>
                            </g>
                        </svg>
                        <div className={styles.center}>
                            <Typography variant="unitMainDisplay">
                                {(watts / 1000).toFixed(1)}
                            </Typography>
                        </div>
                    </div>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="unitLabel">0 KW</Typography>
                        </Grid>
                        <Grid item justifyContent="center">
                            <Typography variant="unitLabel">
                                KILOWATTS
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="unitLabel">5 KW</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
export default MetricGauge;
