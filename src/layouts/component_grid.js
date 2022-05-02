import {useState} from 'react';
import {Grid, Paper, Button, Select, MenuItem, Typography} from '@mui/material';
import {
    CarbonGauge,
    EarningsGauge,
    GenerationGauge,
    ErrorGauge,
} from 'components/gauges/live_metric_gauge';

import {
    EarningsCumulativeImpact,
    GenerationCumulativeImpact,
    CarbonCumulativeImpact,
} from 'components/gauges/live_cumulative_impact';
import WeatherLive from 'components/weather/weather_live';
import DefaultComponent from 'components/utils/default_component';
import PlaceholderWorm from 'components/worm/placeholder_worm';
import PortfolioPlaceholder from 'components/placeholders/portfolio_placeholder';
import Weather from 'components/weather/weather';

function ComponentGrid(props) {
    return (
        <Grid container spacing={4} sx={{width: '100%'}}>
            <Grid item xs={12}>
                <DefaultComponent sx={{m: 0, p: 0}}>
                    <PortfolioPlaceholder></PortfolioPlaceholder>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12}>
                <DefaultComponent sx={{m: 0, p: 0}} disabled={true}>
                    <PlaceholderWorm></PlaceholderWorm>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DefaultComponent disabled={true}>
                    <Weather temp={72} code={800} state={'Sunny'}></Weather>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DefaultComponent disabled={true}>
                    <CarbonGauge max={100} currentValue_unit={10}></CarbonGauge>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DefaultComponent disabled={true}>
                    <EarningsGauge
                        max={100}
                        currentValue_unit={10}
                    ></EarningsGauge>
                </DefaultComponent>
            </Grid>

            <Grid item xs={12} lg={6}>
                <DefaultComponent disabled={true}>
                    <GenerationGauge
                        max={100}
                        currentValue_unit={10}
                    ></GenerationGauge>
                </DefaultComponent>
            </Grid>

            {/* <Grid item xs={12} lg={6}>
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
                <Paper variant="container">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={assetDisplayId.name}
                        label="Test Facility"
                        onChange={onSelectChange}
                        sx={{width: '200px'}}
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
            </Grid> */}
        </Grid>
    );
}

ComponentGrid.propTypes = {};

export default ComponentGrid;
