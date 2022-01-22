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
import { useAuth } from "../hooks/use_auth";
import { Typography } from "@mui/material";

function UserInfo(props) {
    const auth = useAuth();
    const user = auth.user;
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();
    console.log(theme);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper sx={{ minWidth: 275, p: 2 }}>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            User Info
                        </Typography>
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                        <Typography variant="h6">GUI</Typography>
                        <Typography variant="body2">{user.uid}</Typography>
                        <Typography variant="h6">Address</Typography>
                        <Typography variant="body2">{user.uid}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
export default UserInfo;
