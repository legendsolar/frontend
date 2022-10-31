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
    error?: string;
}

const MetricGauge = ({
    min,
    max,
    currentValue,
    unitOpts,
    message = '',
    circleRadius = 150 - 45,
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

    const outerCircleRadius = circleRadius + arcWidth / 2;

    const radiusFromHeight =
        outerCircleRadius < dms.height ? outerCircleRadius : dms.height;
    const radiusFromWidth =
        outerCircleRadius * 2 < dms.width ? outerCircleRadius : dms.width / 2;

    const currentCircleOuterRadius = Math.min(
        radiusFromHeight,
        radiusFromWidth,
    );

    const currentCircleRadius = currentCircleOuterRadius - arcWidth / 2;
    const currentCircleInnerRadius = currentCircleOuterRadius - arcWidth;

    const strokeTotalLength = currentCircleRadius * Math.PI * 2;
    const strokeCurrentLength =
        normalizedCurrentValue * strokeTotalLength * (gaugeAngleTravel / 360.0);

    console.log({
        height: dms.height,
        width: dms.width,
        currentCircleOuterRadius,
        currentCircleInnerRadius,

        radiusFromHeight,
        radiusFromWidth,
    });

    const getGaugeNumber = () => {
        if (currentCircleInnerRadius > 20) {
            return error
                ? '--'
                : unitOpts.unitFormatter(currentValue, false, 3);
        }
    };

    return (
        <Component shadow resize={true}>
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
                        width: '100%',
                        height: 150,

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        alignItems: 'center',
                    }}
                >
                    <svg
                        ref={ref}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                        }}
                    >
                        <g
                            style={{
                                transform: `translate(${currentCircleOuterRadius}px,100%)`,
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
                                    r={currentCircleRadius}
                                />
                                <circle
                                    stroke={
                                        theme.palette[unitOpts.strokeColor].main
                                    }
                                    r={currentCircleRadius}
                                    stroke-dasharray={`${strokeCurrentLength} ${strokeTotalLength}`}
                                />
                            </g>
                            <rect
                                x={currentCircleRadius - arcWidth / 2}
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
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            marginLeft: 'auto',
                            marginRight: 'auto',

                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'end',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant={'headline1' as any}
                            sx={{
                                mt: 'auto',
                                lineHeight:
                                    currentCircleInnerRadius - 10 + 'px',
                                fontSize: currentCircleInnerRadius - 3 + 'px',
                            }}
                        >
                            {getGaugeNumber()}
                        </Typography>
                    </div>
                </div>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        mt: 1,
                        width: '100%',
                        maxWidth: '300px',
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
                        width: '100%',
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
