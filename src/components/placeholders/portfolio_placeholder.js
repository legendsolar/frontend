import {Typography, Grid} from '@mui/material';
import Component from 'components/basics/component';
import PlaceholderWorm from 'components/worm/placeholder_worm';
import Weather from 'components/weather/weather';
import {
    CarbonGauge,
    EarningsGauge,
    GenerationGauge,
} from 'components/gauges/live_metric_gauge';

import {
    EarningsCumulativeImpact,
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
} from 'components/gauges/live_cumulative_impact';
import TransferGrid from 'components/transfers/transfer_grid';
import {portfolioPageTransfers} from 'static/placeholder_transfers';

const PortfolioPlaceholder = () => {
    return (
        <div>
            <Grid container spacing={4} sx={{width: '100%'}}>
                <Grid item xs={12}>
                    <Component>
                        <Typography variant="smallHeadline">
                            You have not purchased any panels yet
                        </Typography>
                        <Typography variant="headline1">
                            Click to view available panels
                        </Typography>
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
                        <CarbonGauge
                            max={100}
                            currentValue_unit={10}
                        ></CarbonGauge>
                    </Component>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Component disabled={true}>
                        <Typography variant="smallHeadline">
                            Dividends
                        </Typography>
                        <TransferGrid
                            transfers={portfolioPageTransfers}
                        ></TransferGrid>
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

                <Grid item xs={12} lg={6}>
                    <Component disabled={true}>
                        <CarbonCumulativeImpact
                            live={false}
                        ></CarbonCumulativeImpact>
                    </Component>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Component disabled={true}>
                        <EarningsCumulativeImpact
                            live={false}
                        ></EarningsCumulativeImpact>
                    </Component>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Component disabled={true}>
                        <GenerationCumulativeImpact
                            live={false}
                        ></GenerationCumulativeImpact>
                    </Component>
                </Grid>
            </Grid>
        </div>
    );
};

export default PortfolioPlaceholder;
