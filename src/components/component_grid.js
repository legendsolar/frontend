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
import WeatherLive from "./weather_live";

function ComponentGrid(props) {
    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
                <WormLive assetId="-MtUbBNCnoz0VdTQ_m-O"></WormLive>
            </Grid>

            <Grid item xs={12}>
                <EarningsGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></EarningsGauge>
            </Grid>

            <Grid item md={12} lg={6}>
                <EarningsCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></EarningsCumulativeImpact>
            </Grid>

            <Grid item md={12} lg={6}>
                <CarbonCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></CarbonCumulativeImpact>
            </Grid>
            <Grid item xs={12}>
                <CarbonGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></CarbonGauge>
            </Grid>
            <Grid item xs={12}>
                <GenerationGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></GenerationGauge>
            </Grid>

            <Grid item md={12} lg={6}>
                <GenerationCumulativeImpact assetId="-MtUbBNCnoz0VdTQ_m-O"></GenerationCumulativeImpact>
            </Grid>

            <Grid item md={12} lg={6}>
                <WeatherLive></WeatherLive>
            </Grid>
            <Grid item xs={12}>
                <UserDebugPaper></UserDebugPaper>
            </Grid>

            <Grid item xs={12}>
                <AssetLiveViewDebug assetId="-MtUbBNCnoz0VdTQ_m-O"></AssetLiveViewDebug>
            </Grid>
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
