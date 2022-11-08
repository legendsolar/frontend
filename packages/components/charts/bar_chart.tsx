import {Box} from '@mui/material';
import * as d3 from 'd3';
import {useChartDimensions} from '../hooks/use_chart_dimensions';
import {useMemo} from 'react';
import WormAxis from './worm_axis';
import {format, subDays, subHours} from 'date-fns';
import {Typography} from '@mui/material';
import {Stack} from '@mui/material';
import {GenerationDatum} from '../schema/schema_gen_types';
import {subMinutes} from 'date-fns';
import {useBarChartData, xAccessor, yAccessor} from './chart_utils';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

var tinycolor = require('tinycolor2');

export const defaultChartDisplayParams = {
    chartMarginSettings: {
        marginLeft: 0,
        marginRight: 60,
        marginTop: 30,
        marginBottom: 60,
    },
};

export interface BarChartProps {
    rawData: Array<GenerationDatum>;
    loading: boolean;
    error: boolean;
    options: typeof defaultChartDisplayParams;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const BarChart = ({rawData, loading, error, options}: BarChartProps) => {
    console.log({rawData});

    const chartSettings = options.chartMarginSettings;

    const {ref, dms} = useChartDimensions(chartSettings);

    console.log({dms});

    const {data, max} = useBarChartData({
        rawData,
        dms,
        loading,
        error,
        pixelsPerUnit: 50,
        minUnitsDisplayed: 24,
        maxUnitsDisplayed: 70,
        subUnit: subHours,
    });

    console.log({data});

    const yScale = useMemo(
        () => d3.scaleLinear().domain([0, max]).range([dms.boundedHeight, 0]),
        [dms.boundedHeight, data],
    );

    const xScale = useMemo(
        () =>
            d3
                .scaleTime()
                .domain(d3.extent(data, xAccessor) as any)
                .range([0, dms.boundedWidth]),
        [dms.boundedWidth, data],
    );

    const labels = data.map((d: GenerationDatum) => format(xAccessor(d), 'p'));
    const yData = data.map((d: GenerationDatum) => yAccessor(d));

    return (
        <Bar
            options={{
                events: [],
                hover: {mode: undefined},
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }}
            data={{
                labels,
                datasets: [
                    {
                        data: yData,
                        borderWidth: 0,
                        borderRadius: 5,
                        borderSkipped: false,
                    },
                ],
            }}
        ></Bar>
    );
};
