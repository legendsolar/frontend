import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import styles from "./metric_gauge.module.css";
import LivePill from "../pills/live_pill";
const tinycolor = require("tinycolor2");

function MetricGauge({
    min,
    max,
    currentValue,
    unitOpts,

    circleRadius,
    arcWidth,
    componentWidth,
    gaugeAngleTravel,
}) {
    const normalizedCurrentValue = currentValue / (max - min);

    const currentAngle = 180 + normalizedCurrentValue * gaugeAngleTravel;
    const strokeTotalLength = circleRadius * Math.PI * 2;
    const strokeCurrentLength =
        normalizedCurrentValue * strokeTotalLength * (gaugeAngleTravel / 360.0);

    return (
        <Paper variant={"container"} sx={{ display: "inline-block" }}>
            <Stack>
                <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{ width: "100%", mb: 3 }}
                >
                    <Typography variant="smallHeadline">
                        {unitOpts.title}
                    </Typography>
                    <LivePill message={unitOpts.liveMessage}></LivePill>
                </Stack>
                <div
                    className={styles.gauge}
                    style={{
                        width: componentWidth,
                        height: 184,
                    }}
                >
                    <svg
                        className={styles.svgElement}
                        viewBox={`0 0 ${componentWidth} 184`}
                    >
                        <g className={styles.centerTransform}>
                            <g
                                className={styles.filledArcs}
                                style={{
                                    strokeWidth: arcWidth,
                                }}
                            >
                                <circle
                                    className={styles.background}
                                    r={circleRadius}
                                />
                                <circle
                                    stroke={unitOpts.strokeColor}
                                    r={circleRadius}
                                    stroke-dasharray={`${strokeCurrentLength} ${strokeTotalLength}`}
                                />
                            </g>
                            <rect
                                x={circleRadius - arcWidth / 2}
                                y="-2"
                                width={arcWidth}
                                height="4"
                                fill="black"
                                transform={`rotate(${currentAngle})`}
                            ></rect>
                        </g>
                    </svg>
                    <div className={styles.center}>
                        <Typography variant="headline1">
                            {currentValue.toFixed(1)}
                        </Typography>
                    </div>
                </div>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="label">
                        {min + " " + unitOpts.unit}
                    </Typography>

                    <Typography variant="body1" align="center">
                        {unitOpts.unitDescription}
                    </Typography>

                    <Typography variant="label">
                        {max + " " + unitOpts.unit}
                    </Typography>
                </Stack>
            </Stack>

            <Stack direction="row" justifyContent="end" sx={{ mt: 3 }}>
                <Typography variant="label" sx={{ ml: "auto" }}>
                    {unitOpts.liveMessage}
                </Typography>
            </Stack>
        </Paper>
    );
}

MetricGauge.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired,
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        liveMessage: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }).isRequired,
    // Optional
    circleRadius: PropTypes.number,
    arcWidth: PropTypes.number,
    gaugeAngleTravel: PropTypes.number,
    componentWidth: PropTypes.number,
};

MetricGauge.defaultProps = {
    circleRadius: 90 + 45,
    arcWidth: 90,
    componentWidth: 360,
    gaugeAngleTravel: 180,
};
export default MetricGauge;
