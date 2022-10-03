import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Typography, useTheme} from '@mui/material';
import LivePill from 'components/pills/live_pill';
import {useChartDimensions} from 'hooks/use_chart_dimensions';
import {numberFormatter} from 'utils/number_formatter';
import Component from 'components/basics/component';

export interface UnitOpts {
    title: string;
    unit: string;
    unitDescription: string;
    unitSubHeading?: string;
    strokeColor: string;
    unitFormatter(u: number, includeUnit?: boolean, width?: number): string;
}

interface Props {
    min: number;
    max: number;
    currentValue: number;
    message?: string;
    unitOpts: UnitOpts;
    circleRadius?: number;
    arcWidth?: number;
    gaugeAngleTravel?: number;
    error: string;
}

const MetricGauge = ({
    min,
    max,
    currentValue,
    unitOpts,
    message = '',
    circleRadius = 90 + 45,
    arcWidth = 90,
    gaugeAngleTravel = 180,

    error,
}: Props) => {
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
        <Component shadow>
            <Stack alignItems={'center'}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    sx={{mb: 3, width: '100%'}}
                >
                    <Typography variant={'smallHeadline' as any}>
                        {unitOpts.title}
                    </Typography>
                    <LivePill error={error}></LivePill>
                </Stack>
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '400px',
                        width: '100%',
                        height: 184,
                    }}
                    ref={ref}
                >
                    <svg
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            right: 0,
                        }}
                        width={'360px'}
                    >
                        <g
                            style={{
                                transform: 'translate(50%,100%)',
                            }}
                        >
                            <g
                                style={{
                                    transform: 'rotate(180deg)',
                                    fill: 'none',
                                    strokeWidth: arcWidth,
                                }}
                            >
                                <circle
                                    style={{
                                        stroke: '#F4F5f5',
                                    }}
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
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'end',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant={'headline1' as any}
                            sx={{mt: 'auto', lineHeight: '65px'}}
                        >
                            {error
                                ? '--'
                                : unitOpts.unitFormatter(
                                      currentValue,
                                      false,
                                      3,
                                  )}
                        </Typography>
                    </div>
                </div>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mt: 1,
                        width: '360px',
                    }}
                >
                    <Typography variant={'subtitle3' as any}>
                        {error
                            ? `${unitOpts.unit}-`
                            : unitOpts.unitFormatter(min)}
                    </Typography>

                    <Stack alignItems={'center'} justifyContent={'flex-start'}>
                        <Typography variant="subtitle1">
                            {unitOpts.unitDescription}
                        </Typography>

                        {unitOpts.unitSubHeading && (
                            <Typography variant={'label' as any}>
                                {unitOpts.unitSubHeading}
                            </Typography>
                        )}
                    </Stack>

                    <Typography variant={'subtitle3' as any}>
                        {error
                            ? `${unitOpts.unit}-`
                            : unitOpts.unitFormatter(max)}
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
                    <Typography variant={'label' as any} sx={{ml: 'auto'}}>
                        {message}
                    </Typography>
                </Stack>
            </Stack>
        </Component>
    );
};

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
