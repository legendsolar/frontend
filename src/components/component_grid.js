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
    ErrorGauge,
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
        <Grid container>
            <Grid item xs={12}>
                <WormLive assetId="-MtUbBNCnoz0VdTQ_m-O"></WormLive>
            </Grid>

            <Grid item>
                <EarningsGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></EarningsGauge>
            </Grid>
            <Grid item>
                <EarningsCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></EarningsCumulativeImpact>
            </Grid>
            <Grid item>
                <CarbonGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></CarbonGauge>
            </Grid>
            <Grid item>
                <CarbonCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></CarbonCumulativeImpact>
            </Grid>
            <Grid item>
                <GenerationGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></GenerationGauge>
            </Grid>
            <Grid item>
                <GenerationCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></GenerationCumulativeImpact>
            </Grid>
            <Grid item>
                <ErrorGauge></ErrorGauge>
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

            <Grid item xs={4}>
                <AssetLiveViewDebug assetId="-MtUbBNCnoz0VdTQ_m-O"></AssetLiveViewDebug>
            </Grid>
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
