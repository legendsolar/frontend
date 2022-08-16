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
import Component from 'components/basics/component';
import PlaceholderWorm from 'components/worm/placeholder_worm';
import PortfolioPlaceholder from 'components/placeholders/portfolio_placeholder';
import Weather from 'components/weather/weather';

function ComponentGrid(props) {
    return (
        <Grid container spacing={4} sx={{width: '100%'}}>
            <Grid item xs={12}>
                <Component sx={{m: 0, p: 0}}>
                    <PortfolioPlaceholder></PortfolioPlaceholder>
                </Component>
            </Grid>

            <Grid item xs={12}>
                <Component sx={{m: 0, p: 0}} disabled={true}>
                    <PlaceholderWorm></PlaceholderWorm>
                </Component>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Component disabled={true}>
                    <Weather temp={72} code={800} state={'Sunny'}></Weather>
                </Component>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Component disabled={true}>
                    <CarbonGauge max={100} currentValue_unit={10}></CarbonGauge>
                </Component>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Component disabled={true}>
                    <EarningsGauge
                        max={100}
                        currentValue_unit={10}
                    ></EarningsGauge>
                </Component>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Component disabled={true}>
                    <GenerationGauge
                        max={100}
                        currentValue_unit={10}
                    ></GenerationGauge>
                </Component>
            </Grid>

            {/* <Grid item xs={12} lg={6}>
                <Component>
                    <EarningsGauge assetId={assetDisplayId.id}></EarningsGauge>
                </Component>
            </Grid>


            <Grid item md={12} lg={6}>
                <Component>
                    <EarningsCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></EarningsCumulativeImpact>
                </Component>
            </Grid>

            <Grid item md={12} lg={6}>
                <Component>
                    <CarbonCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></CarbonCumulativeImpact>
                </Component>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Component>
                    <CarbonGauge assetId={assetDisplayId.id}></CarbonGauge>
                </Component>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Component>
                    <GenerationGauge
                        assetId={assetDisplayId.id}
                    ></GenerationGauge>
                </Component>
            </Grid>

            <Grid item md={12} lg={6}>
                <Component>
                    <GenerationCumulativeImpact
                        assetId={assetDisplayId.id}
                    ></GenerationCumulativeImpact>
                </Component>
            </Grid>

            <Grid item md={12} lg={6}>
                <Component>
                    <WeatherLive></WeatherLive>
                </Component>
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
