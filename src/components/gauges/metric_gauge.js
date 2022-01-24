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
    const unit = props.unit;
    const unitDescription = props.unitDescription;
    const min = props.min;
    const max = props.max;
    const currentValue = props.currentValue;
    const title = props.title;
    const strokeColor = props.strokeColor;
    const isLive = props.isLive;
    const liveMessage = props.liveMessage;

    // const useStyles = makeStyles((theme) => ({
    //     gaugeStroke: {
    //         stroke: theme.palette.text.primary,
    //     },
    // }));

    // const classes = useStyles();

    // const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
    //     useObject(ref(database, "production/" + assetId + "/summary"));

    // let watts = 0;
    // let lastUpdateTime = 0;
    // let formattedDate = "";

    // if (assetProdSummarySnap && !assetProdSummaryLoading) {
    //     watts = assetProdSummarySnap.val().recent.watts;
    //     lastUpdateTime = new Date(
    //         parseInt(assetProdSummarySnap.val().recent.time)
    //     );
    //     formattedDate = format(lastUpdateTime, "Pp");
    // }

    const normalizedCurrentValue = currentValue / (max - min);

    const gaugeAngleTravel = 180;
    const currentAngle = 180 + normalizedCurrentValue * gaugeAngleTravel;
    const circleRadius = 90 + 45;
    const strokeTotalLength = circleRadius * Math.PI * 2;
    const strokeCurrentLength =
        normalizedCurrentValue * strokeTotalLength * (gaugeAngleTravel / 360.0);
    const arc_width = 90;
    const width = 360;

    return (
        <Paper sx={{ p: 2 }}>
            <div style={{ width: "360px" }}>
                <Grid container sx={{ width: width + "px" }}>
                    <Grid item>
                        <Grid
                            sx={{ width: width + "px" }}
                            container
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="dashboardHeader">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <LivePill></LivePill>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <div
                            className={styles.gauge}
                            style={{ width: width, height: 184 }}
                        >
                            <svg
                                className={styles.svgElement}
                                viewBox={`0 0 ${width} 184`}
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
                                            stroke={strokeColor}
                                            r={circleRadius}
                                            stroke-dasharray={`${strokeCurrentLength} ${strokeTotalLength}`}
                                        />
                                    </g>
                                    <rect
                                        x={circleRadius - arc_width / 2}
                                        y="-2"
                                        width={arc_width}
                                        height="4"
                                        fill="black"
                                        transform={`rotate(${currentAngle})`}
                                    ></rect>
                                </g>
                            </svg>
                            <div className={styles.center}>
                                <Typography variant="unitMainDisplay">
                                    {currentValue.toFixed(1)}
                                </Typography>
                            </div>
                        </div>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography variant="unitLabel">
                                    {min + " " + unit}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="unitLabel">
                                    {unitDescription}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="unitLabel">
                                    {max + " " + unit}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
}
export default MetricGauge;
