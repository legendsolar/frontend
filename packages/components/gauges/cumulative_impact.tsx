import {Typography, Chip, Stack} from '@mui/material';
import {useState} from 'react';
import {Component, VertDivider} from '../basics';
import {Unit, defined, mapFunction} from '@p/utils';

export interface CumulativeData {
    day: number;
    week: number;
    month: number;
    year: number;
}

export interface CumulativeImpactProps {
    title: string;
    cumulativeData: CumulativeData;
    unit: Unit;
}

export const CumulativeImpact = ({
    title,
    cumulativeData,
    unit,
}: CumulativeImpactProps) => {
    const [historyState, setHistoryState] = useState('week');

    const parsedCumulativeData = mapFunction<CumulativeData>(
        cumulativeData,
        (val) => (defined(val) ? val.toFixed(2) : '-'),
    );

    return (
        <Component shadow resize={true}>
            <Stack justifyContent="space-between" spacing={8}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{mb: 3, width: '100%'}}
                >
                    <Typography variant={'smallHeadline' as any}>
                        {title}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack
                        justifyContent={'center'}
                        sx={{display: {xs: 'none', md: 'inline'}}}
                    >
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
                                color: unit.color,
                            }}
                            align="center"
                        >
                            {`${parsedCumulativeData[historyState]}`}
                        </Typography>

                        <Typography variant="body1" align="center">
                            {unit.unit}
                        </Typography>
                    </Stack>
                    <VertDivider></VertDivider>

                    <Stack
                        justifyContent={'center'}
                        sx={{display: {xs: 'none', md: 'inline'}}}
                    >
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
