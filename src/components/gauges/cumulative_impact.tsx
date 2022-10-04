import {Typography, Box, Paper, Chip, Stack} from '@mui/material';
import VertDivider from 'components/basics/vert_divider';
import PropTypes from 'prop-types';
import {useState} from 'react';
import Component from 'components/basics/component';
import {UnitOpts} from 'components/gauges/metric_gauge';
import {defined, mapFunction} from 'utils/object_utils';

export interface CumulativeData {
    day: number;
    week: number;
    month: number;
    year: number;
}

interface Props {
    cumulativeData: CumulativeData;
    unitOpts: UnitOpts;
}

const CumulativeImpact = ({cumulativeData, unitOpts}: Props) => {
    const [historyState, setHistoryState] = useState('week');

    const parsedCumulativeData = mapFunction<CumulativeData>(
        cumulativeData,
        (val) => (defined(val) ? val.toFixed(2) : '-'),
    );

    return (
        <Component shadow>
            <Stack justifyContent="space-between" spacing={8}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{mb: 3, width: '100%'}}
                >
                    <Typography variant={'smallHeadline' as any}>
                        {unitOpts.title}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack justifyContent={'center'}>
                        <Typography variant={'label' as any} align="center">
                            AVG
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                            -
                        </Typography>
                    </Stack>
                    <VertDivider></VertDivider>
                    <Stack justifyContent={'center'}>
                        <Typography
                            variant={'headline1' as any}
                            sx={{
                                color: unitOpts.strokeColor,
                            }}
                            align="center"
                        >
                            {`${parsedCumulativeData[historyState]}`}
                        </Typography>

                        <Typography variant="body1" align="center">
                            {unitOpts.unit}
                        </Typography>
                    </Stack>
                    <VertDivider></VertDivider>

                    <Stack justifyContent={'center'}>
                        <Typography align="center" variant={'label' as any}>
                            BEST
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                            -
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-evenly"
                >
                    <Chip
                        label={historyState == 'year' ? 'Year to Date' : 'Y2D'}
                        onClick={() => setHistoryState('year')}
                        clickable={true}
                        variant={
                            historyState == 'year'
                                ? 'selected'
                                : ('light' as any)
                        }
                    ></Chip>

                    <Chip
                        label={
                            historyState == 'month' ? 'Month to Date' : 'M2D'
                        }
                        onClick={() => setHistoryState('month')}
                        clickable={true}
                        variant={
                            historyState == 'month'
                                ? 'selected'
                                : ('light' as any)
                        }
                    ></Chip>

                    <Chip
                        label={historyState == 'week' ? 'Week to Date' : 'W2D'}
                        onClick={() => setHistoryState('week')}
                        clickable={true}
                        variant={
                            historyState == 'week'
                                ? 'selected'
                                : ('light' as any)
                        }
                    ></Chip>

                    <Chip
                        label={historyState == 'day' ? 'Past 24 Hours' : '24H'}
                        onClick={() => setHistoryState('day')}
                        clickable={true}
                        variant={
                            historyState == 'day'
                                ? 'selected'
                                : ('light' as any)
                        }
                    ></Chip>
                </Stack>
            </Stack>
        </Component>
    );
};

export default CumulativeImpact;
