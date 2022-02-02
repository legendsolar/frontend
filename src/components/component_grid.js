import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import UserDebugPaper from "./user_debug_paper";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricSummary from "./summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import WormLive from "./worm/worm_live";
import Weather from "./weather";
import DividendWidget from "./dividends/dividend_widget";
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
} from "./gauges/cumulative_impact";

function ComponentGrid(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();
    console.log(theme);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack direction="row" spacing={2}>
                <QuickAccountSummary></QuickAccountSummary>
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
                    <Grid item xs={6}>
                        <DividendWidget></DividendWidget>
                    </Grid>
                    <Grid item xs={12}>
                        <UserDebugPaper></UserDebugPaper>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
