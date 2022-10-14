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
import Slider from '@mui/material/Slider';
import {
    Button,
    Checkbox,
    Stack,
    Typography,
    Switch,
    useTheme,
} from '@mui/material';
import {useState} from 'react';

import {legendaryGreen} from 'static/colors';
import Component from 'components/basics/component';
import {paletteOptions} from 'app_theme';
import da from 'date-fns/esm/locale/da/index.js';
import {
    CashIcon,
    LeafIcon,
    PowerIcon,
    SunIcon,
} from 'components/icons/emoji_icons';
import {RoundedBoxIcon} from 'components/icons/icons';
import {UnitOpts} from 'components/gauges/metric_gauge';
import {numberFormatter} from 'utils/number_formatter';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);
ChartJS.register({
    /* Adjust axis labelling font size according to chart size */
    id: 'responsiveXlabels',
    afterDatasetDraw(chart, args, options) {
        const {
            ctx,
            scales: {x, y},
        } = chart;

        ctx.textAlign = 'center';
        ctx.fillStyle = paletteOptions.palette.white.main;

        chart.data.labels?.map((l, i) => {
            ctx.fillText(
                l as string,
                x.getPixelForValue(i),
                y.getPixelForValue(0) - 10,
            );
        });
    },
});

export const earningsUnitOpts: UnitOpts = {
    unit: '',
    unitDescription: 'Dollars',
    unitSubHeading: 'per hour',
    title: 'Cash Earned',
    strokeColor: 'legendaryGreen',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        return currencyFormatterInt_over100.format(u);
    },
};

export const generationUnitOpts: UnitOpts = {
    unit: 'KWH',
    unitSubHeading: 'per hour',
    unitDescription: 'Kilowatts',
    title: 'Generation',
    strokeColor: 'pencilYellow',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        if (includeUnit) {
            return `${numberFormatter(u, width, true)} kWh`;
        } else {
            return `${numberFormatter(u, width, true)}`;
        }
    },
};

export const carbonUnitOpts: UnitOpts = {
    unit: 'LBS',
    unitDescription: 'Pounds ',
    unitSubHeading: 'per hour',
    title: 'Carbon Aversion',
    strokeColor: 'skyBlue',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        if (includeUnit) {
            return `${numberFormatter(u, width, true)} LBS`;
        } else {
            return `${numberFormatter(u, width, true)}`;
        }
    },
};

const currencyFormatterInt_over100 = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

interface Props {
    maxYears: number;
    maxPanels: number;
    minPanels: number;
    panelCost: number;
}

const ReturnsCalculator = ({
    maxYears,
    maxPanels,
    minPanels,
    panelCost,
}: Props) => {
    const theme = useTheme();

    const options = {
        responsive: true,
    };

    const [panels, setPanels] = useState<number>(1);
    const [reinvest, setReinvest] = useState<boolean>(true);
    const [unitState, setUnitState] = useState<UnitOpts>(earningsUnitOpts);

    // const years = R.range(0, 10);

    const years = Array.from({length: maxYears}, (x, i) => i);
    const labels = years.map((y: number) => 'Y' + y);

    // const panelsValue = R.mapAccum(
    //     (acc, value) => [
    //         acc * (1 - dep_percentage),
    //         acc * (1 - dep_percentage),
    //     ],
    //     initialInvestment,
    //     years,
    // )[1];

    // const totals = R.mapAccum(
    //     (acc, value) => [
    //         acc * (1 + year_percentage),
    //         acc * (1 + year_percentage),
    //     ],
    //     initialInvestment,
    //     years,
    // )[1];

    const displayData = reinvest
        ? years.map((y) => 1.3 ** y * panels)
        : years.map((y) => 1.3 * y * panels);

    const color = theme.palette[unitState.strokeColor].main;

    return (
        <Component standardWidth={false} sx={{p: 0}}>
            <Stack sx={{p: 4, backgroundColor: 'whiteFog.main'}}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Stack direction="row" alignItems={'center'}>
                        <Typography
                            variant={'headline2' as any}
                        >{`${panels} Panels`}</Typography>
                        <Typography
                            variant={'headline2' as any}
                        >{`|`}</Typography>
                        <Typography
                            variant={'headline2' as any}
                        >{`${currencyFormatterInt_over100.format(
                            panels * panelCost,
                        )}`}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems={'center'}>
                        <Typography variant={'description' as any}>
                            {'Reinvest Earnings'}
                        </Typography>
                        <Switch
                            defaultChecked={reinvest}
                            onChange={() => {
                                setReinvest(!reinvest);
                            }}
                        />
                    </Stack>
                </Stack>
                <Slider
                    aria-label="Volume"
                    value={panels}
                    onChange={(event, newValue) =>
                        setPanels(newValue as number)
                    }
                    min={1}
                    max={10}
                />
            </Stack>
            <Stack sx={{p: 4}}>
                <div
                    style={{
                        position: 'relative',
                        margin: 'auto',
                        width: '100%',
                        height: '300px',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            margin: 'auto',
                            width: '50%',
                            height: '150px',
                        }}
                    >
                        <Component
                            standardWidth={false}
                            background={true}
                            sx={{
                                backgroundColor: 'whiteHaze.main',
                                width: '100%',
                            }}
                        >
                            <Stack direction="row">
                                <Stack>
                                    <RoundedBoxIcon
                                        icon={<SunIcon></SunIcon>}
                                    ></RoundedBoxIcon>
                                </Stack>
                                <Stack>
                                    <Typography
                                        variant={'subtitle3' as any}
                                    >{`10 year ${'generation'} potential`}</Typography>
                                    <Typography
                                        variant={'headline2' as any}
                                    >{`${unitState.unitFormatter(
                                        1000 * panels,
                                    )}`}</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant={'description' as any}>
                                {
                                    'You could illumintae the status of liberty with the power this invesmtent will generate!'
                                }
                            </Typography>
                        </Component>
                    </div>
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
                            scales: {
                                y: {
                                    ticks: {
                                        display: false,
                                        callback: (value, index, ticks) =>
                                            currencyFormatterInt_over100.format(
                                                value as number,
                                            ),
                                    },
                                    title: {
                                        display: false,
                                    },
                                    grid: {
                                        display: false,
                                        drawBorder: false,
                                    },
                                    min:
                                        displayData.reduce(
                                            (min, i) => (min < i ? min : i),
                                            0,
                                        ) + 0,
                                },
                                x: {
                                    display: false,
                                    ticks: {
                                        callback: (value, index, ticks) => {
                                            if (index === 0) {
                                                return 'Today';
                                            } else if (
                                                index ===
                                                ticks.length - 1
                                            ) {
                                                return `Year ${index}`;
                                            }
                                        },
                                    },
                                    grid: {
                                        display: false,
                                        drawBorder: false,
                                    },
                                },
                            },
                        }}
                        data={{
                            labels,
                            datasets: [
                                {
                                    data: displayData,
                                    backgroundColor: color,
                                    borderColor: 'rgba(0,0,0,0)',
                                    borderWidth: 0,
                                    borderRadius: 5,
                                },
                            ],
                        }}
                    ></Bar>
                </div>

                <Stack direction="row" sx={{mt: 2}}>
                    <Button
                        sx={{
                            backgroundColor: 'whiteHaze.main',
                            borderRadius: '5px',
                            p: 4,
                        }}
                        onClick={() => {
                            setUnitState(earningsUnitOpts);
                        }}
                    >
                        <CashIcon></CashIcon>
                        <Typography variant={'smallHeadline' as any}>
                            Cash
                        </Typography>
                    </Button>

                    <Button
                        sx={{
                            backgroundColor: 'whiteHaze.main',
                            borderRadius: '5px',
                            p: 4,
                        }}
                        onClick={() => {
                            setUnitState(carbonUnitOpts);
                        }}
                    >
                        <LeafIcon></LeafIcon>
                        <Typography variant={'smallHeadline' as any}>
                            Carbon
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'whiteHaze.main',
                            borderRadius: '5px',
                            p: 4,
                        }}
                        onClick={() => {
                            setUnitState(generationUnitOpts);
                        }}
                    >
                        <PowerIcon />
                        <Typography variant={'smallHeadline' as any}>
                            Electricity
                        </Typography>
                    </Button>
                </Stack>
            </Stack>
        </Component>
    );
};
export default ReturnsCalculator;
