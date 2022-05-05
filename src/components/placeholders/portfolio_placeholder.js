import {Typography, Grid} from '@mui/material';
import DefaultComponent from 'components/utils/default_component';
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
import {portfolioPageTransfers} from 'static_data/placeholder_transfers';

const PortfolioPlaceholder = () => {
    return (
        <div>
            <Grid container spacing={4} sx={{width: '100%'}}>
                <Grid item xs={12}>
                    <DefaultComponent>
                        <Typography variant="smallHeadline">
                            You have not purchased any panels yet
                        </Typography>
                        <Typography variant="headline1">
                            Click to view available panels
                        </Typography>
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
                        <CarbonGauge
                            max={100}
                            currentValue_unit={10}
                        ></CarbonGauge>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DefaultComponent disabled={true}>
                        <Typography variant="smallHeadline">
                            Dividends
                        </Typography>
                        <TransferGrid
                            transfers={portfolioPageTransfers}
                        ></TransferGrid>
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

                <Grid item xs={12} lg={6}>
                    <DefaultComponent disabled={true}>
                        <CarbonCumulativeImpact
                            live={false}
                        ></CarbonCumulativeImpact>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DefaultComponent disabled={true}>
                        <EarningsCumulativeImpact
                            live={false}
                        ></EarningsCumulativeImpact>
                    </DefaultComponent>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <DefaultComponent disabled={true}>
                        <GenerationCumulativeImpact
                            live={false}
                        ></GenerationCumulativeImpact>
                    </DefaultComponent>
                </Grid>
            </Grid>
        </div>
    );
};

export default PortfolioPlaceholder;
