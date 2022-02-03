import { Grid, Paper, Button } from "@mui/material";

import UserDebugPaper from "./user_debug_paper";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricSummary from "./summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import WormLive from "./worm/worm_live";
import Weather from "./weather";
import QuickAccountSummary from "./quick_account_summary";
import {
    CarbonGauge,
    EarningsGauge,
    GenerationGauge,
} from "./gauges/live_metric_gauge";

import {
    EarningsCumulativeImpact,
    GenerationCumulativeImpact,
    CarbonCumulativeImpact,
} from "./gauges/live_cumulative_impact";

function ComponentGrid(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();
    console.log(theme);

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} md={8} lg={8}>
                <WormLive assetId="-MtUbBNCnoz0VdTQ_m-O"></WormLive>
            </Grid>

            <Grid item xs={4}>
                <AssetLiveViewDebug assetId="-MtUbBNCnoz0VdTQ_m-O"></AssetLiveViewDebug>
            </Grid>
            <Grid item>
                <EarningsGauge assetId="-MuCmzKbnofQ9TY_sIp9"></EarningsGauge>
            </Grid>
            <Grid item>
                <EarningsCumulativeImpact assetId="-MuCmzKbnofQ9TY_sIp9"></EarningsCumulativeImpact>
            </Grid>
            <Grid item>
                <CarbonGauge assetId="-MuCq8nkhE8gqGrdG9Ta"></CarbonGauge>
            </Grid>
            <Grid item>
                <CarbonCumulativeImpact assetId="-MuCmzKbnofQ9TY_sIp9"></CarbonCumulativeImpact>
            </Grid>
            <Grid item>
                <GenerationGauge assetId="-MuCqDzSoaF0yXWZbouB"></GenerationGauge>
            </Grid>
            <Grid item>
                <GenerationCumulativeImpact assetId="-MuCmzKbnofQ9TY_sIp9"></GenerationCumulativeImpact>
            </Grid>
            <Grid item xs={6}>
                <MetricSummary></MetricSummary>
            </Grid>
            <Grid item xs={6}>
                <Weather></Weather>
            </Grid>
            <Grid item xs={12}>
                <UserDebugPaper></UserDebugPaper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Button variant="text">Default</Button>
                    <Button variant="contained" color="secondary">
                        Default
                    </Button>
                    <Button variant="contained" color="dark">
                        Default
                    </Button>
                    <Button variant="contained" color="green">
                        Default
                    </Button>
                    <Button variant="outlined">Default</Button>
                </Paper>
            </Grid>
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
