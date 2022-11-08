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
    Stack,
    Typography,
    Box,
    useTheme,
    Grid,
    useMediaQuery,
} from '@mui/material';
import {useState} from 'react';

import {
    carbonEnglish,
    dollars,
    energy,
    panels as panelsUnit,
    Unit,
    UnitEnum,
    PanelRecord,
} from '@project/hooks/types';

import {Component} from '../basics/component';
import {paletteOptions} from '../theme/theme';
import {CashIcon, LeafIcon, PowerIcon, SunIcon} from '../icons/emoji_icons';
import {MinusIcon, PlusIcon, RoundedBoxIcon} from '../icons/icons';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface CustomSunThumbProps extends React.HTMLAttributes<unknown> {}

export interface ReturnsCalculatorProps {
    maxYears: number;
    maxPanels: number;
    minPanels: number;
    panelCost: number;
    panelRecords: Array<PanelRecord>;
    panels: number;
    setPanels(n: number): void;
}

export const ReturnsCalculator = ({
    maxYears,
    maxPanels,
    minPanels,
    panelCost,
    panelRecords,
    panels,
    setPanels,
}: ReturnsCalculatorProps) => {
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

    const theme = useTheme();

    const options = {
        responsive: true,
    };

    const [unitState, setUnitState] = useState<Unit>(energy);

    // const years = R.range(0, 10);

    const years = Array.from({length: maxYears}, (x, i) => i);
    const labels = years.map((y: number) => 'Y' + (y + 1));

    const fakePanelFunction = (y, panels) => (1.3 * (y + 1) * panels) / 2 + 4;

    const displayData = false
        ? years.map((y) => 1.3 ** y * panels)
        : years.map((y) => fakePanelFunction(y, panels));

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
                return `Est. 10 year cash returned`;
            case UnitEnum.ENERGY:
                return `Ten year generation potential`;
            case UnitEnum.CARBON:
                return `Ten year carbon aversion potential`;
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

    const renderHeader = (constrained: boolean) => {
        if (!constrained) {
            return (
                <Stack
                    sx={{p: 4, backgroundColor: 'whiteFog.main'}}
                    spacing={4}
                >
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Stack direction="row" alignItems={'center'}>
                            <Stack spacing={0}>
                                <Typography
                                    variant={'subtitle3' as any}
                                    color={'blackDawn.main'}
                                >{`Panels purchased`}</Typography>
                                <Typography
                                    variant={'smallHeadline' as any}
                                >{`${panelsUnit.format(panels)}`}</Typography>
                            </Stack>
                            <Typography
                                variant={'headline2' as any}
                                color={'white.main'}
                            >{`|`}</Typography>

                            <Stack spacing={0}>
                                <Typography
                                    variant={'subtitle3' as any}
                                    color={'blackDawn.main'}
                                >{`Total investment`}</Typography>

                                <Typography
                                    variant={'smallHeadline' as any}
                                    color={'blackDawn.main'}
                                >{`${dollars.format(
                                    panels * panelCost,
                                )}`}</Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems={'center'}
                            sx={{mt: 2}}
                        >
                            <Button
                                sx={{
                                    backgroundColor:
                                        unitState === dollars
                                            ? 'white.main'
                                            : 'whiteHaze.main',
                                    borderRadius: '10px 0px 0px 10px',
                                    p: {
                                        xs: 2,
                                        lg: 2,
                                    },
                                    pl: {
                                        xs: 2,
                                        lg: 4,
                                    },
                                    pr: {
                                        xs: 2,
                                        lg: 4,
                                    },
                                    height: '40px',
                                    minWidth: {
                                        xs: '35px',
                                        md: null,
                                    },

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    '&:hover': {
                                        backgroundColor: 'white.main',
                                        opacity: 0.9,
                                    },
                                }}
                                onClick={() => {
                                    setUnitState(dollars);
                                }}
                            >
                                <CashIcon></CashIcon>
                                <Typography
                                    variant={'subtitle3' as any}
                                    sx={{
                                        ml: 2,
                                        display: {xs: 'none', lg: 'block'},
                                    }}
                                >
                                    Cash
                                </Typography>
                            </Button>

                            <Button
                                sx={{
                                    backgroundColor:
                                        unitState === carbonEnglish
                                            ? 'white.main'
                                            : 'whiteHaze.main',
                                    borderRadius: '0px',
                                    p: {
                                        xs: 2,
                                        lg: 2,
                                    },
                                    pl: {
                                        xs: 2,
                                        lg: 4,
                                    },
                                    pr: {
                                        xs: 2,
                                        lg: 4,
                                    },
                                    height: '40px',
                                    minWidth: {
                                        xs: '35px',
                                        md: null,
                                    },

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    '&:hover': {
                                        backgroundColor: 'white.main',
                                        opacity: 0.9,
                                    },
                                }}
                                onClick={() => {
                                    setUnitState(carbonEnglish);
                                }}
                            >
                                <LeafIcon></LeafIcon>
                                <Typography
                                    variant={'subtitle3' as any}
                                    sx={{
                                        ml: 2,
                                        display: {xs: 'none', lg: 'block'},
                                    }}
                                >
                                    Carbon
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor:
                                        unitState === energy
                                            ? 'white.main'
                                            : 'whiteHaze.main',
                                    borderRadius: '0px 10px 10px 0px',
                                    p: {
                                        xs: 0,
                                        lg: 2,
                                    },
                                    pl: {
                                        xs: 1,
                                        lg: 4,
                                    },
                                    pr: {
                                        xs: 1,
                                        lg: 4,
                                    },
                                    height: '40px',
                                    minWidth: {
                                        xs: '35px',
                                        md: null,
                                    },
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'white.main',
                                        opacity: 0.9,
                                    },
                                }}
                                onClick={() => {
                                    setUnitState(energy);
                                }}
                            >
                                <PowerIcon />
                                <Typography
                                    variant={'subtitle3' as any}
                                    sx={{
                                        ml: 2,
                                        display: {xs: 'none', lg: 'block'},
                                    }}
                                >
                                    Electricity
                                </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={5}
                    >
                        <Button
                            sx={{
                                border: '1px solid currentColor',
                                maxWidth: '45px',
                                minWidth: '45px',
                                height: '45px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => setPanels(panels - 1)}
                        >
                            <MinusIcon />
                        </Button>
                        <Slider
                            aria-label="Volume"
                            value={panels}
                            onChange={(event, newValue) =>
                                setPanels(newValue as number)
                            }
                            min={1}
                            max={10}
                            marks={marks}
                            color={'blackDawn' as any}
                            components={{Thumb: CustomThumb}}
                            sx={{
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#D9D9D9',
                                    borderRadius: '2px',
                                    height: '10px',
                                    opacity: 1,
                                },

                                '& .MuiSlider-track': {
                                    display: 'none',
                                },

                                '& .MuiSlider-thumb': {
                                    height: 37,
                                    width: 37,
                                    backgroundColor: '#FFF',
                                    boxShadow: 'none',
                                    border: '3px solid currentColor',
                                },
                                '& .MuiSlider-mark': {
                                    height: 10,
                                    width: 10,
                                    backgroundColor: 'currentColor',
                                    boxShadow: 'none',
                                    border: 'none',
                                    borderRadius: '0%',

                                    opacity: 1,
                                },
                            }}
                        />

                        <Button
                            sx={{
                                border: '1px solid currentColor',
                                maxWidth: '45px',
                                minWidth: '45px',
                                height: '45px',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => setPanels(panels + 1)}
                        >
                            <PlusIcon />
                        </Button>
                    </Stack>
                </Stack>
            );
        } else {
            return (
                <Stack
                    sx={{p: 4, backgroundColor: 'whiteFog.main'}}
                    spacing={4}
                >
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        sx={{width: '100%'}}
                    >
                        <Stack spacing={0}>
                            <Typography
                                variant={'subtitle3' as any}
                                color={'blackDawn.main'}
                            >{`Panels purchased`}</Typography>
                            <Typography
                                variant={'smallHeadline' as any}
                            >{`${panelsUnit.format(panels)}`}</Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'flex-start'}
                        >
                            <Button
                                sx={{
                                    border: '1px solid currentColor',
                                    maxWidth: '45px',
                                    minWidth: '45px',
                                    height: '45px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => setPanels(panels - 1)}
                            >
                                <MinusIcon />
                            </Button>
                            <Button
                                sx={{
                                    border: '1px solid currentColor',
                                    maxWidth: '45px',
                                    minWidth: '45px',
                                    height: '45px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => setPanels(panels + 1)}
                            >
                                <PlusIcon />
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems={'center'}
                        sx={{mt: 2}}
                    >
                        <Button
                            sx={{
                                backgroundColor:
                                    unitState === dollars
                                        ? 'white.main'
                                        : 'whiteHaze.main',
                                borderRadius: '10px 0px 0px 10px',
                                p: {
                                    xs: 2,
                                    lg: 2,
                                },
                                pl: {
                                    xs: 2,
                                    lg: 4,
                                },
                                pr: {
                                    xs: 2,
                                    lg: 4,
                                },
                                height: '40px',

                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center',

                                '&:hover': {
                                    backgroundColor: 'white.main',
                                    opacity: 0.9,
                                },
                            }}
                            onClick={() => {
                                setUnitState(dollars);
                            }}
                        >
                            <CashIcon></CashIcon>
                        </Button>

                        <Button
                            sx={{
                                backgroundColor:
                                    unitState === carbonEnglish
                                        ? 'white.main'
                                        : 'whiteHaze.main',
                                borderRadius: '0px',
                                p: {
                                    xs: 2,
                                    lg: 2,
                                },
                                pl: {
                                    xs: 2,
                                    lg: 4,
                                },
                                pr: {
                                    xs: 2,
                                    lg: 4,
                                },
                                height: '40px',
                                minWidth: {
                                    xs: '35px',
                                    md: null,
                                },

                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center',

                                '&:hover': {
                                    backgroundColor: 'white.main',
                                    opacity: 0.9,
                                },
                            }}
                            onClick={() => {
                                setUnitState(carbonEnglish);
                            }}
                        >
                            <LeafIcon></LeafIcon>
                        </Button>
                        <Button
                            sx={{
                                backgroundColor:
                                    unitState === energy
                                        ? 'white.main'
                                        : 'whiteHaze.main',
                                borderRadius: '0px 10px 10px 0px',
                                p: {
                                    xs: 0,
                                    lg: 2,
                                },
                                pl: {
                                    xs: 1,
                                    lg: 4,
                                },
                                pr: {
                                    xs: 1,
                                    lg: 4,
                                },
                                height: '40px',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    backgroundColor: 'white.main',
                                    opacity: 0.9,
                                },
                            }}
                            onClick={() => {
                                setUnitState(energy);
                            }}
                        >
                            <PowerIcon />
                        </Button>
                    </Stack>
                </Stack>
            );
        }
    };

    const marks = Array.from({length: maxPanels - 2}, (x, i) => ({
        value: i + 2,
        label: null,
    }));

    const CustomThumb = ({children, ...other}: CustomSunThumbProps) => {
        return (
            <SliderThumb {...other}>
                {children}
                {<SunIcon />}
            </SliderThumb>
        );
    };

    const constrained = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Component standardWidth={false} sx={{p: 0, overflow: 'hidden'}}>
            {renderHeader(constrained)}
            <Stack
                sx={{
                    pl: {
                        xs: 2,
                        md: 4,
                    },
                    pr: {
                        xs: 2,
                        md: 4,
                    },
                    pb: 2,
                    pt: 0,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        margin: 'auto',
                        width: '100%',
                        height: {
                            xs: '400px',
                            lg: '300px',
                        },
                        justifyContent: 'flex-end',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            margin: 'auto',
                            top: '0px',
                            marginTop: {
                                xs: '10px',
                                lg: '20px',
                            },
                            width: {
                                xs: '100%',
                                lg: '50%',
                            },
                            maxWidth: '450px',
                            minWidth: '300px',
                        }}
                    >
                        <Stack
                            sx={{
                                p: 2,
                                pr: 3,
                                pl: 3,
                                backgroundColor: 'whiteFog.main',
                                borderRadius: '5px',
                            }}
                            alignItems="start"
                            spacing={1}
                        >
                            <Typography variant={'subtitle1' as any}>
                                {renderHeadline(unitState)}
                            </Typography>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant={'headline2' as any}
                                    color={color}
                                >{`${unitState.format(
                                    totalInUnit,
                                )}`}</Typography>

                                <Box
                                    component={'img'}
                                    src={analogyEmojiUrl}
                                    maxHeight={'45px'}
                                    maxWidth={'45px'}
                                    sx={{
                                        display: 'flex',
                                        borderRadius: '5px',
                                        background: '#FFF',
                                    }}
                                />
                            </Stack>
                        </Stack>
                        <Stack sx={{p: 2}}>
                            <Typography variant={'description' as any}>
                                {analogyText}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            height: {
                                xs: '250px',
                                lg: '300px',
                            },
                        }}
                    >
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
                                        max: fakePanelFunction(
                                            maxYears,
                                            maxPanels,
                                        ),
                                        min: 0,
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
                    </Box>
                </Box>
            </Stack>

            <Stack sx={{p: 4, backgroundColor: 'whiteFog.main', mt: 0}}>
                <Stack
                    sx={{
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        alignItems: {
                            xs: 'flex-start',
                            md: 'center',
                        },
                    }}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Typography variant={'subtitle2' as any}>
                        {`$250 estimated cost per panel`}
                    </Typography>
                    <Typography variant={'subtitle2' as any}>
                        {`7.3% estimated return`}
                    </Typography>
                </Stack>
            </Stack>
        </Component>
    );
};
