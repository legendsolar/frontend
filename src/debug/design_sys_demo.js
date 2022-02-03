import { Paper, Button, Stack, Typography, Box, Divider } from "@mui/material";

import MetricGauge from "../components/gauges/metric_gauge";
import CumulativeImpact from "../components/gauges/cumulative_impact";
import MetricList from "../components/metric_list";
import MetricSummary from "../components/summary/metric_summary";
import Worm from "../components/worm/worm";
import data from "../components/worm/fake_data";
import TransferComponent from "../components/dividends/transfer_component";

const DesignSysDemo = (props) => {
    return (
        <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                    {"Typography (broken, WIP)"}
                </Typography>
                <Typography variant="headline1">Headline 1</Typography>
                <Typography variant="headline2">Headline 2</Typography>
                <Typography variant="subtitle1">Subtitle 1</Typography>
                <Typography variant="body1">Headline 1</Typography>
                <Typography variant="label">Label</Typography>
                <Typography variant="description">Description</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">
                    {"Colors (broken, WIP)"}
                </Typography>
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        width: "50px",
                        height: "50px",
                    }}
                ></Box>

                <Box
                    sx={{
                        bgcolor: "dark.main",
                        width: "50px",
                        height: "50px",
                    }}
                ></Box>

                <Box
                    sx={{
                        bgcolor: "secondary.main",
                        width: "50px",
                        height: "50px",
                    }}
                ></Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Buttons </Typography>
                <Typography variant="subtitle2">Secondary </Typography>
                <Button color="light">Light Button</Button>
                <Button color="dark">Dark Button</Button>
                <Button color="legendaryGreen">Green Button</Button>

                <Typography variant="subtitle2">Primary</Typography>
                <Button color="light" variant="primary">
                    Light Button
                </Button>
                <Button color="dark" variant="primary">
                    Dark Button
                </Button>
                <Button color="legendaryGreen" variant="primary">
                    Green Button
                </Button>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Components</Typography>

                <Divider sx={{ m: 2 }} />
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
                        strokeColor: "#00FF00",
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
                        strokeColor: "#0000FF",
                    }}
                ></CumulativeImpact>

                <Divider sx={{ m: 2 }} />
                <Typography variant="subtitle1">
                    {"Worm (default options, fake data)"}
                </Typography>
                <Worm data={data}></Worm>

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

                <Typography variant="subtitle1">
                    {"Transfer Component"}
                </Typography>

                <TransferComponent
                    title={"Transfer Name"}
                    amount={99.99}
                    source={"Source"}
                    destination={"Destination"}
                    date={new Date()}
                ></TransferComponent>
            </Paper>
        </Stack>
    );
};

export default DesignSysDemo;
