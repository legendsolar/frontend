import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import UserDebugPaper from "./user_debug_paper";
import UserAssetDebugPaper from "./user_asset_debug";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricSummary from "./summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import BasicProdWorm from "./worm/BasicProdWorm";
import WormLive from "./worm/worm_live";
import EarningsGauge from "./gauges/earning_gauge";
import CarbonGauge from "./gauges/carbon_gauge";
import GenerationGauge from "./gauges/generation_gauge";

function ComponentGrid(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();
    console.log(theme);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <UserDebugPaper></UserDebugPaper>
                </Grid>
                <Grid item xs={4}>
                    <AssetLiveViewDebug></AssetLiveViewDebug>
                </Grid>
                <Grid item>
                    <EarningsGauge assetId="-MuCmzKbnofQ9TY_sIp9"></EarningsGauge>
                </Grid>
                <Grid item>
                    <CarbonGauge assetId="-MuCq8nkhE8gqGrdG9Ta"></CarbonGauge>
                </Grid>
                <Grid item>
                    <GenerationGauge assetId="-MuCqDzSoaF0yXWZbouB"></GenerationGauge>
                </Grid>
                <Grid item xs={6}>
                    <MetricSummary></MetricSummary>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <WormLive assetId="-MtUbBNCnoz0VdTQ_m-O"></WormLive>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                        }}
                    ></Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    ></Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
