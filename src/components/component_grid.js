import { useState } from "react";
import {
    Grid,
    Paper,
    Button,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
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
    const [assetDisplayId, setAssetDisplayId] = useState({
        id: "-MtUbBNCnoz0VdTQ_m-O",
        name: "Barnyard Solar",
    });

    const assetList = [
        {
            id: "-MtUbBNCnoz0VdTQ_m-O",
            name: "Barnyard Solar",
        },

        {
            id: "-MuCmzKbnofQ9TY_sIp9",
            name: "Hawaii Solar",
        },

        {
            id: "-MuCq8nkhE8gqGrdG9Ta",
            name: "Big Sur Solar",
        },

        {
            id: "-MuCqDzSoaF0yXWZbouB",
            name: "Sinusoidal Test",
        },

        {
            id: "-MuDYXAdGcdAzeGJmzj3",
            name: "Constant Output Test",
        },
    ];

    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
                <WormLive assetId={assetDisplayId.id}></WormLive>
            </Grid>
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
