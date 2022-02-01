import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import UserDebugPaper from "./user_debug_paper";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricSummary from "./summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import WormLive from "./worm/worm_live";
import EarningsGauge from "./gauges/earning_gauge";
import CarbonGauge from "./gauges/carbon_gauge";
import GenerationGauge from "./gauges/generation_gauge";
import Weather from "./weather";
import DividendWidget from "./dividends/dividend_widget";

import {
    EarningsCumulativeImpact,
    GenerationCumulativeImpact,
    CarbonCumulativeImpact,
} from "./gauges/cumulative_impact";

function ComponentGrid(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();
    console.log(theme);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Chart */}
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
                <Grid item xs={6}>
                    <DividendWidget></DividendWidget>
                </Grid>
                <Grid item xs={12}>
                    <UserDebugPaper></UserDebugPaper>
                </Grid>
            </Grid>
        </Container>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
