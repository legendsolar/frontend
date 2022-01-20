import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import UserDebugPaper from "./user_debug_paper";
import UserAssetDebugPaper from "./user_asset_debug";
import AssetLiveViewDebug from "./asset_live_view_debug";
import MetricGauge from "./gauges/metric_gauge";
import MetricSummary from "./summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import BasicProdWorm from "./worm/BasicProdWorm";

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
                <Grid item xs={6}>
                    <MetricGauge
                        unit={"USD"}
                        unitDescription={"Dollars per hour"}
                        min={0}
                        max={225}
                        currentValue={5}
                        title="Earnings"
                        strokeColor={"#30A462"}
                        isLive={true}
                        liveMessage="updated 15 min ago"
                        assetId="-MtUpMiLZ0cvkQ-Dok2z"
                    ></MetricGauge>
                </Grid>
                <Grid item xs={6}>
                    <MetricSummary></MetricSummary>
                </Grid>
                <Grid item xs={6}>
                    <BasicProdWorm></BasicProdWorm>
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
