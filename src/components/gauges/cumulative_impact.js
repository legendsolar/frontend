import {Typography, Box, Paper, Chip, Stack} from '@mui/material';
import VertDivider from 'components/basics/vert_divider';
import PropTypes from 'prop-types';
import {useState} from 'react';
import Component from 'components/basics/component';

const CumulativeImpact = ({cumulativeData, unitOpts, live}) => {
    const [historyState, setHistoryState] = useState('week');

    const parsedCumulativeData = live
        ? {
              day: cumulativeData.day.toFixed(2),
              week: cumulativeData.week.toFixed(2),
              month: cumulativeData.month.toFixed(2),
              year: cumulativeData.year.toFixed(2),
          }
        : {
              day: '-',
              week: '-',
              month: '-',
              year: '-',
          };

    return (
        <Component>
            <Stack justifyContent="space-between" spacing={1}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    sx={{ml: 4}}
                >
                    <Typography variant="smallHeadline">
                        {unitOpts.title}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack justifyContent={'center'}>
                        <Typography variant="label" align="center">
                            AVG
                        </Typography>

                        <Typography variant="subtitle1" align="center">
                            -
                        </Typography>
                    </Stack>
                    <VertDivider></VertDivider>
                    <Stack justifyContent={'center'}>
                        <Typography
                            variant="headline1"
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
                        <Typography align="center" variant="label">
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
                        variant={historyState == 'year' ? 'selected' : 'light'}
                    ></Chip>

                    <Chip
                        label={
                            historyState == 'month' ? 'Month to Date' : 'M2D'
                        }
                        onClick={() => setHistoryState('month')}
                        clickable={true}
                        variant={historyState == 'month' ? 'selected' : 'light'}
                    ></Chip>

                    <Chip
                        label={historyState == 'week' ? 'Week to Date' : 'W2D'}
                        onClick={() => setHistoryState('week')}
                        clickable={true}
                        variant={historyState == 'week' ? 'selected' : 'light'}
                    ></Chip>

                    <Chip
                        label={historyState == 'day' ? 'Past 24 Hours' : '24H'}
                        onClick={() => setHistoryState('day')}
                        clickable={true}
                        variant={historyState == 'day' ? 'selected' : 'light'}
                    ></Chip>
                </Stack>
            </Stack>
        </Component>
    );
};

CumulativeImpact.propTypes = {
    cumulativeData: PropTypes.shape({
        day: PropTypes.number.isRequired,
        week: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
    }),
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }),
    live: PropTypes.bool,
};

export default CumulativeImpact;
