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
import Slider, {SliderThumb} from '@mui/material/Slider';
import {
    Button,
    Checkbox,
    Stack,
    Typography,
    Switch,
    Box,
    useTheme,
} from '@mui/material';
import {useState} from 'react';

import Component from 'components/basics/component';
import {paletteOptions} from 'app_theme';
import {
    CashIcon,
    LeafIcon,
    PowerIcon,
    SunIcon,
} from 'components/icons/emoji_icons';
import {RoundedBoxIcon} from 'components/icons/icons';
import {UnitOpts} from 'components/gauges/metric_gauge';
import {currencyFormatter, numberFormatter} from 'utils/number_formatter';
import {
    carbonEnglish,
    dollars,
    energy,
    panels as panelsUnit,
    Unit,
    UnitEnum,
} from 'static/units';

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
        ctx.font = `bold 13px Be Vietnam Pro`;

        chart.data.labels?.map((l, i) => {
            ctx.fillText(
                l as string,
                x.getPixelForValue(i),
                y.getPixelForValue(0) - 5,
            );
        });
    },
});

export interface PanelRecord {
    panelCount: number;
    analogies: {
        [UnitEnum.DOLLARS]: string;
        [UnitEnum.CARBON]: string;
        [UnitEnum.ENERGY]: string;
    };
    totals: {
        [UnitEnum.DOLLARS]: number;
        [UnitEnum.CARBON]: number;
        [UnitEnum.ENERGY]: number;
    };
    imageUrl: {
        [UnitEnum.DOLLARS]: string;
        [UnitEnum.CARBON]: string;
        [UnitEnum.ENERGY]: string;
    };
}

interface CustomSunThumbProps extends React.HTMLAttributes<unknown> {}

interface Props {
    maxYears: number;
    maxPanels: number;
    minPanels: number;
    panelCost: number;
    panelRecords: Array<PanelRecord>;
}

const ReturnsCalculator = ({
    maxYears,
    maxPanels,
    minPanels,
    panelCost,
    panelRecords,
}: Props) => {
    const theme = useTheme();

    const options = {
        responsive: true,
    };

    const [panels, setPanels] = useState<number>(1);
    const [reinvest, setReinvest] = useState<boolean>(true);
    const [unitState, setUnitState] = useState<Unit>(energy);

    // const years = R.range(0, 10);

    const years = Array.from({length: maxYears}, (x, i) => i);
    const labels = years.map((y: number) => 'Y' + (y + 1));

    const displayData = reinvest
        ? years.map((y) => 1.3 ** y * panels)
        : years.map((y) => 1.3 * (y + 1) * panels);

    const color = theme.palette[unitState.color].main;

    const record =
        panels > panelRecords.length
            ? panelRecords[panelRecords.length - 1]
            : panelRecords[panels - 1];

    const analogyText = record.analogies[unitState.enum];
    const analogyEmojiUrl = record.imageUrl[unitState.enum];
    const totalInUnit = record.totals[unitState.enum];

    const renderHeadline = (unit: Unit) => {
        switch (unit.enum) {
            case UnitEnum.DOLLARS:
                return `${maxYears} year earning potential`;
            case UnitEnum.ENERGY:
                return `${maxYears} year generation potential`;
            case UnitEnum.CARBON:
                return `${maxYears} year aversion potential`;
            default:
                return '';
        }
    };

    const renderThumb = (unit: Unit) => {
        switch (unit.enum) {
            case UnitEnum.DOLLARS:
                return <CashIcon />;
            case UnitEnum.ENERGY:
                return <PowerIcon />;
            case UnitEnum.CARBON:
                return <LeafIcon />;
            default:
                return <SunIcon />;
        }
    };

    const CustomThumb = ({children, ...other}: CustomSunThumbProps) => {
        return (
            <SliderThumb {...other}>
                {children}
                {renderThumb(unitState)}
            </SliderThumb>
        );
    };

    return (
        <Component standardWidth={false} sx={{p: 0, overflow: 'hidden'}}>
            <Stack sx={{p: 4, backgroundColor: 'whiteFog.main'}} spacing={4}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Stack direction="row" alignItems={'center'}>
                        <Typography
                            variant={'headline2' as any}
                        >{`${panelsUnit.format(panels)}`}</Typography>
                        <Typography
                            variant={'headline2' as any}
                            color={'white.main'}
                        >{`|`}</Typography>
                        <Typography
                            variant={'headline2' as any}
                            color={'blackDawn.main'}
                        >{`${dollars.format(panels * panelCost)}`}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{mt: 2}}>
                        <Button
                            sx={{
                                backgroundColor: 'whiteHaze.main',
                                borderRadius: '5px 0px 0px 5px',
                                p: 4,
                            }}
                            onClick={() => {
                                setUnitState(dollars);
                            }}
                        >
                            <CashIcon></CashIcon>
                            <Typography
                                variant={'smallHeadline' as any}
                                sx={{ml: 2}}
                            >
                                Cash
                            </Typography>
                        </Button>

                        <Button
                            sx={{
                                backgroundColor: 'whiteHaze.main',
                                borderRadius: '0px',
                                p: 4,
                            }}
                            onClick={() => {
                                setUnitState(carbonEnglish);
                            }}
                        >
                            <LeafIcon></LeafIcon>
                            <Typography
                                variant={'smallHeadline' as any}
                                sx={{ml: 2}}
                            >
                                Carbon
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: 'whiteHaze.main',
                                borderRadius: '0px 5px 5px 0px',
                                p: 4,
                            }}
                            onClick={() => {
                                setUnitState(energy);
                            }}
                        >
                            <PowerIcon />
                            <Typography
                                variant={'smallHeadline' as any}
                                sx={{ml: 2}}
                            >
                                Electricity
                            </Typography>
                        </Button>
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
                    marks={true}
                    color={unitState.color as any}
                    components={{Thumb: CustomThumb}}
                    sx={{
                        '& .MuiSlider-thumb': {
                            height: 37,
                            width: 37,
                            backgroundColor: '#FFF',
                            boxShadow: 'none',
                            border: '3px solid currentColor',
                        },
                        '& .MuiSlider-mark': {
                            height: 5,
                            width: 5,
                            backgroundColor: '#FFF',
                            boxShadow: 'none',
                            border: '3px solid currentColor',
                            borderRadius: '50%',
                        },
                    }}
                />
            </Stack>
            <Stack sx={{pl: 4, pr: 4, pb: 4, pt: 0}}>
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
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'whiteHaze.main',
                                width: '100%',
                                p: 2,
                                borderRadius: '5px',
                            }}
                        >
                            <Stack direction="row">
                                <Stack>
                                    <RoundedBoxIcon
                                        icon={
                                            <Box
                                                component={'img'}
                                                src={analogyEmojiUrl}
                                                maxHeight={'30px'}
                                                maxWidth={'30px'}
                                            />
                                        }
                                    ></RoundedBoxIcon>
                                </Stack>
                                <Stack spacing={0}>
                                    <Typography variant={'subtitle3' as any}>
                                        {renderHeadline(unitState)}
                                    </Typography>
                                    <Typography
                                        variant={'smallHeadline' as any}
                                        color={color}
                                    >{`${unitState.format(
                                        totalInUnit,
                                    )}`}</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant={'description' as any}>
                                {analogyText}
                            </Typography>
                        </Box>
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
                                            dollars.format(value as number),
                                    },
                                    title: {
                                        display: false,
                                    },
                                    grid: {
                                        display: false,
                                        drawBorder: false,
                                    },
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
                                    borderSkipped: false,
                                },
                            ],
                        }}
                    ></Bar>
                </div>
            </Stack>

            <Stack sx={{p: 4, backgroundColor: 'whiteFog.main'}}>
                <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Typography variant={'smallHeadline' as any}>
                        {`$250 EST COST PER PANEL`}
                    </Typography>
                    <Typography variant={'smallHeadline' as any}>
                        {`8.2% EST ROI`}
                    </Typography>
                </Stack>
            </Stack>
        </Component>
    );
};
export default ReturnsCalculator;
