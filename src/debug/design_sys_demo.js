import { useState } from "react";
import { TextField, useTheme } from "@mui/material";
import {
    Paper,
    Button,
    Stack,
    Typography,
    Box,
    Divider,
    Checkbox,
} from "@mui/material";

import MetricGauge from "../components/gauges/metric_gauge";
import CumulativeImpact from "../components/gauges/cumulative_impact";
import MetricList from "../components/summary/metric_list";
import MetricSummary from "../components/summary/metric_summary";
import Worm from "../components/worm/worm";
import data from "../components/worm/fake_data";
import TransactionComponent from "../components/transactions/transfer_component";
import Weather from "../components/weather/weather";
import CheckboxList from "../components/inputs/checkbox_list";
import Wallet from "../components/wallet/wallet_component";
import UserStatus from "../components/user_status";
import DefaultComponent from "../components/default_component";

const DesignSysDemo = (props) => {
    const theme = useTheme();

    const [color, setColor] = useState(theme.palette["legendaryGreen"].main);
    console.log("hex color: " + color);

    return (
        <Stack spacing={2} sx={{ m: 2 }}>
            <Typography variant="headline1">Theme</Typography>
            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">{"Typography"}</Typography>
                    <Typography variant="headline1">Headline 1</Typography>
                    <Typography variant="subtitle1">Subtitle 1</Typography>
                    <Typography variant="body1">Body 1</Typography>
                    <Typography variant="headline2">Headline 2</Typography>
                    <Typography variant="subtitle2">Subtitle 2</Typography>
                    <Typography variant="body2">Body 2</Typography>
                    <Typography variant="description">Description</Typography>
                    <Typography variant="smallHeadline">
                        Small Headline
                    </Typography>
                    <Typography variant="subtitle3">Subtitle 3</Typography>
                    <Typography variant="label">Label</Typography>
                </Stack>
            </Paper>

            <Paper variant="container">
                <Typography variant="subtitle2">
                    {"Color Matrix (main, light, dark, contrast text color)"}
                </Typography>
                {[
                    "legendaryGreen",
                    "whiteHaze",
                    "whiteFog",
                    "blackDusk",
                    "blackDawn",
                    "skyBlue",
                    "grassGreen",
                    "pencilYellow",
                    "eraserRed",
                ].map((name) => {
                    return (
                        <Stack direction="row" alignItems="center">
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].main)
                                }
                                sx={{
                                    bgcolor: `${name}.main`,
                                    width: "50px",
                                    height: "50px",
                                    alignItems: "center",
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].light)
                                }
                                sx={{
                                    bgcolor: `${name}.light`,
                                    width: "50px",
                                    height: "50px",
                                    alignItems: "center",
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].dark)
                                }
                                sx={{
                                    bgcolor: `${name}.dark`,
                                    width: "50px",
                                    height: "50px",
                                    alignItems: "center",
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(
                                        theme.palette[`${name}`].contrastText
                                    )
                                }
                                sx={{
                                    bgcolor: `${name}.main`,
                                    width: "50px",
                                    height: "50px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "24px",
                                        color: `${name}.contrastText`,
                                    }}
                                >
                                    Eg
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="light.contrastText"
                                sx={{
                                    ml: 2,
                                }}
                            >
                                {name}
                            </Typography>
                        </Stack>
                    );
                })}

                <Typography variant="body1" sx={{ mt: 2 }}>
                    Selected Color:
                </Typography>
                <Box sx={{ height: "50px", bgcolor: color }}></Box>
            </Paper>

            <Typography variant="headline1">Inputs</Typography>

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">Buttons </Typography>
                    <Typography variant="subtitle3">Primary</Typography>

                    <Button variant="primary">Primary Button</Button>
                    <Button variant="primary" disabled={true}>
                        Disabled
                    </Button>
                    <Typography variant="subtitle3">Secondary</Typography>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="secondary" disabled={true}>
                        Secondary Button
                    </Button>

                    <Button variant="mini">Mini Button</Button>
                    <Button variant="mini" disabled={true}>
                        Mini Button
                    </Button>
                    <Typography variant="subtitle3">Others</Typography>

                    <Button variant="header">Header Button</Button>
                </Stack>
            </Paper>

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">Check Box Lists</Typography>
                    <CheckboxList
                        options={[
                            {
                                description: "First Checkbox Item",
                                title: "Title",
                            },
                            {
                                description: "Second Checkbox Item",
                                title: "Title",
                            },
                            {
                                description: "Third Checkbox Item",
                                title: "Other Title",
                            },
                        ]}
                    ></CheckboxList>
                </Stack>
            </Paper>

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">Text Inputs</Typography>
                    <Typography variant="subtitle3">Filled Text Box</Typography>

                    <TextField
                        name="firstName"
                        label="Hint Text"
                        variant="filled"
                        value={""}
                        // InputProps={{ disableUnderline: true }}
                    ></TextField>
                </Stack>
            </Paper>

            <Typography variant="headline1">Components</Typography>
            <Typography variant="body1">
                Select Color Matrix to change default color
            </Typography>

            <Divider sx={{ m: 2 }} />

            <Typography variant="subtitle1">Default Component</Typography>

            <DefaultComponent>
                <Stack>
                    <Typography variant="smallHeadline">
                        Default Component
                    </Typography>
                    <Typography variant="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Nulla facilisi cras fermentum odio eu
                        feugiat pretium nibh.
                    </Typography>

                    <Button variant="primary">Button</Button>
                </Stack>
            </DefaultComponent>

            <DefaultComponent inactive={true}>
                <Stack>
                    <Typography variant="smallHeadline">
                        Inactive Default Component
                    </Typography>
                    <Typography variant="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Nulla facilisi cras fermentum odio eu
                        feugiat pretium nibh.
                    </Typography>

                    <Button variant="primary">Button</Button>
                </Stack>
            </DefaultComponent>

            <DefaultComponent disabled={true} inactive={true}>
                <Stack>
                    <Typography variant="smallHeadline">
                        Inactive and Disabled Default Component
                    </Typography>
                    <Typography variant="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Nulla facilisi cras fermentum odio eu
                        feugiat pretium nibh.
                    </Typography>

                    <Button variant="primary">Button</Button>
                </Stack>
            </DefaultComponent>

            <Typography variant="subtitle1">Wallet</Typography>

            <Paper variant="container">
                <Wallet></Wallet>
            </Paper>

            <Paper variant="container">
                <UserStatus></UserStatus>
            </Paper>

            <Typography variant="subtitle1">MetricGauge</Typography>

            <MetricGauge
                min={0}
                max={100}
                currentValue={40}
                unitOpts={{
                    title: "Metric Gauge Live",
                    liveMessage: "live message",
                    unit: "unit",
                    unitDescription: "unit description",
                    strokeColor: color,
                }}
            ></MetricGauge>

            <Divider sx={{ m: 2 }} />
            <Typography variant="subtitle1">CumulativeImpact</Typography>

            <CumulativeImpact
                cumulativeData={{
                    day: 1,
                    week: 10,
                    month: 1000,
                    year: 10000,
                }}
                unitOpts={{
                    title: "Cumulative Impact",
                    unit: "unit",
                    unitDescription: "unit description",
                    strokeColor: color,
                }}
            ></CumulativeImpact>

            <Divider sx={{ m: 2 }} />
            <Typography variant="subtitle1">
                {"Worm (default options, fake data)"}
            </Typography>
            <Worm rawData={data} loading={false} error={false}></Worm>

            <Divider sx={{ m: 2 }} />
            <Typography variant="subtitle1">{"Metric List"}</Typography>
            <MetricList
                valuePairs={[
                    {
                        metric: "LIST METRIC 1",
                        value: "LIST METRIC VALUE 1",
                    },
                    { metric: "KWH GENERATED", value: "10,725" },
                    { metric: "UPTIME", value: "99%" },
                ]}
            ></MetricList>

            <Divider sx={{ m: 2 }} />

            <Typography variant="subtitle1">{"Transfer Component"}</Typography>

            <TransactionComponent
                title={"Transfer Name"}
                amount={99.99}
                source={"Source"}
                destination={"Destination"}
                date={new Date()}
            ></TransactionComponent>

            <Divider sx={{ m: 2 }} />

            <Typography variant="subtitle1">{"Weather Component"}</Typography>
            <Weather temp={"0"} state={"clear"} code={800}></Weather>
            <Weather temp={"10"} state={"cloudy"} code={801}></Weather>
            <Weather temp={"50"} state={"Fog"} code={701}></Weather>
            <Weather temp={"32"} state={"Snow"} code={600}></Weather>
            <Weather temp={"80"} state={"Rain"} code={400}></Weather>
            <Weather temp={"100"} state={"Thunderstorm"} code={201}></Weather>
        </Stack>
    );
};

export default DesignSysDemo;
