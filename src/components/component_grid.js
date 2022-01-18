import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import UserDebugPaper from "./user_debug_paper";
import UserAssetDebugPaper from "./user_asset_debug";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricGauge from "./gauges/metric_gauge";

function ComponentGrid(props) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <UserDebugPaper></UserDebugPaper>
                </Grid>
                <Grid item xs={4}>
                    <AssetLiveViewDebug></AssetLiveViewDebug>
                </Grid>
                <Grid item xs={6}>
                    <MetricGauge assetId="-MtUpMiLZ0cvkQ-Dok2z"></MetricGauge>
                </Grid>
                <Grid item xs={6}>
                    <MetricGauge assetId="-MtUbBNCnoz0VdTQ_m-O"></MetricGauge>
                </Grid>
                <Grid item xs={6}>
                    <MetricGauge assetId="-MtUbIFv67HYfn235K8L"></MetricGauge>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 240,
                        }}
                    ></Paper>
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
