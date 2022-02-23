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
import DefaultErrorBoundary from "./errors/default_error_boundary";

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

    const onSelectChange = (event) => {
        console.log(event);

        assetList.map((asset) => {
            if (asset.name === event.target.value) {
                setAssetDisplayId(asset);
            }
        });
    };

    return (
        <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <WormLive assetId={assetDisplayId.id}></WormLive>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <EarningsGauge assetId={assetDisplayId.id}></EarningsGauge>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultErrorBoundary>
                    <EarningsCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></EarningsCumulativeImpact>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultErrorBoundary>
                    <CarbonCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></CarbonCumulativeImpact>
                </DefaultErrorBoundary>
            </Grid>
            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <CarbonGauge assetId={assetDisplayId.id}></CarbonGauge>
                </DefaultErrorBoundary>
            </Grid>
            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <GenerationGauge
                        assetId={assetDisplayId.id}
                    ></GenerationGauge>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultErrorBoundary>
                    <GenerationCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></GenerationCumulativeImpact>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultErrorBoundary>
                    <WeatherLive></WeatherLive>
                </DefaultErrorBoundary>
            </Grid>
            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <UserDebugPaper></UserDebugPaper>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item xs={12}>
                <DefaultErrorBoundary>
                    <AssetLiveViewDebug
                        assetId={assetDisplayId.id}
                    ></AssetLiveViewDebug>
                </DefaultErrorBoundary>
            </Grid>

            <Grid item xs={12}>
                <Paper variant="container">
                    <Typography variant="label">[DEBUG ONLY]</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={assetDisplayId.name}
                        label="Test Facility"
                        onChange={onSelectChange}
                        sx={{ width: "200px" }}
                    >
                        {assetList.map((asset) => {
                            return (
                                <MenuItem
                                    value={asset.name}
                                    name={asset.id}
                                    key={asset.id}
                                >
                                    {asset.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Paper>
            </Grid>
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
