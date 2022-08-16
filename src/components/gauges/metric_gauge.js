import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Typography, useTheme} from '@mui/material';
import styles from 'components/gauges/metric_gauge.module.css';
import LivePill from 'components/pills/live_pill';
import {useChartDimensions} from 'hooks/use_chart_dimensions';
import {numberFormatter} from 'utils/number_formatter';
import Component from 'components/basics/component';

const tinycolor = require('tinycolor2');

function MetricGauge({
    min,
    max,
    currentValue,
    unitOpts,

    circleRadius,
    arcWidth,
    componentWidth,
    gaugeAngleTravel,

    error,
}) {
    const theme = useTheme();

    const [ref, dms] = useChartDimensions({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    });

    const normalizedCurrentValue = error
        ? 0.5
        : (currentValue - min) / (max - min);

    const currentAngle = error
        ? 270
        : 180 + normalizedCurrentValue * gaugeAngleTravel;
    const strokeTotalLength = circleRadius * Math.PI * 2;
    const strokeCurrentLength =
        normalizedCurrentValue * strokeTotalLength * (gaugeAngleTravel / 360.0);

    return (
        <Component sx={{p: 1}}>
            <Stack alignItems={'center'}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{mb: 3}}
                >
                    <Typography variant="smallHeadline">
                        {unitOpts.title}
                    </Typography>
                    <LivePill error={error}></LivePill>
                </Stack>
                <div
                    className={styles.gauge}
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        height: 184,
                    }}
                    ref={ref}
                >
                    <svg className={styles.svgElement} width={dms.width}>
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
                                    stroke={
                                        theme.palette[unitOpts.strokeColor].main
                                    }
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
                        <Typography variant="headline1" sx={{mt: 'auto'}}>
                            {error ? '--' : numberFormatter(currentValue)}
                        </Typography>
                    </div>
                </div>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mt: 1,
                        width: '360px',
                        maxWidth: '400px',
                    }}
                >
                    <Typography variant="label">
                        {error
                            ? `${unitOpts.unit}-`
                            : `${numberFormatter(min)} ${unitOpts.unit}`}
                    </Typography>

                    <Typography variant="body1">
                        {unitOpts.unitDescription}
                    </Typography>

                    <Typography variant="label">
                        {error
                            ? `${unitOpts.unit}-`
                            : `${numberFormatter(max)} ${unitOpts.unit}`}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="end"
                    sx={{
                        mt: 3,
                        width: '360px',
                    }}
                >
                    <Typography variant="label" sx={{ml: 'auto'}}>
                        {unitOpts.liveMessage}
                    </Typography>
                </Stack>
            </Stack>
        </Component>
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

    error: PropTypes.bool,
};

MetricGauge.defaultProps = {
    circleRadius: 90 + 45,
    arcWidth: 90,
    componentWidth: 360,
    gaugeAngleTravel: 180,
    error: false,
};

export default MetricGauge;
