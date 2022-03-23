import { useState } from "react";
import {
    Grid,
    Paper,
    Button,
    Select,
    MenuItem,
    Typography,
} from "@mui/material";
import UserDebugPaper from "../components/user_debug_paper";
import AssetLiveViewDebug from "../components/asset_live_view_debug";
import MetricSummary from "../components/summary/metric_summary";
import useTheme from "@mui/material/styles/useTheme";
import WormLive from "../components/worm/worm_live";
import QuickAccountSummary from "../components/quick_account_summary";
import {
    CarbonGauge,
    EarningsGauge,
    GenerationGauge,
    ErrorGauge,
} from "../components/gauges/live_metric_gauge";

import Wallet from "../components/wallet/wallet_component";

import {
    EarningsCumulativeImpact,
    GenerationCumulativeImpact,
    CarbonCumulativeImpact,
} from "../components/gauges/live_cumulative_impact";
import WeatherLive from "../components/weather/weather_live";
import DefaultComponent from "../components/default_component";

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
                <DefaultComponent sx={{ m: 0, p: 0 }}>
                    <WormLive assetId={assetDisplayId.id}></WormLive>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DefaultComponent>
                    <EarningsGauge assetId={assetDisplayId.id}></EarningsGauge>
                </DefaultComponent>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultComponent>
                    <EarningsCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></EarningsCumulativeImpact>
                </DefaultComponent>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultComponent>
                    <CarbonCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></CarbonCumulativeImpact>
                </DefaultComponent>
            </Grid>
            <Grid item xs={12} lg={6}>
                <DefaultComponent>
                    <CarbonGauge assetId={assetDisplayId.id}></CarbonGauge>
                </DefaultComponent>
            </Grid>
            <Grid item xs={12} lg={6}>
                <DefaultComponent>
                    <GenerationGauge
                        assetId={assetDisplayId.id}
                    ></GenerationGauge>
                </DefaultComponent>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultComponent>
                    <GenerationCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></GenerationCumulativeImpact>
                </DefaultComponent>
            </Grid>

            <Grid item md={12} lg={6}>
                <DefaultComponent>
                    <WeatherLive></WeatherLive>
                </DefaultComponent>
            </Grid>
            <Grid item xs={12}>
                <DefaultComponent>
                    <UserDebugPaper></UserDebugPaper>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12}>
                <DefaultComponent>
                    <AssetLiveViewDebug
                        assetId={assetDisplayId.id}
                    ></AssetLiveViewDebug>
                </DefaultComponent>
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
