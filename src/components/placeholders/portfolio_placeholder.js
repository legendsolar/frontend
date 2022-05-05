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
                            transfers={[
                                {
                                    __typename: 'Transfer',
                                    id: '4718e0f4-a966-474d-a843-a254bc33bebb',
                                    status: 'COMPLETE',
                                    type: 'DIVIDEND',
                                    sourceAccount: {
                                        __typename: 'Wallet',
                                        id: 'da3b0d9a-c4d5-4e2e-adf4-434a0307c6f9',
                                        name: 'Solar Holdings',
                                        type: 'SAVINGS',
                                        mask: 4389,
                                    },
                                    destinationAccount: {
                                        __typename: 'Wallet',
                                        id: 'e76df244-c0af-4de0-a312-6667e33e4004',
                                        name: 'Legends Wallet',
                                        type: 'WALLET',
                                        mask: null,
                                    },
                                    amount: '$59.15',
                                    created: 1646497478000,
                                    title: 'Dividend Payment',
                                    destinationName: 'Legends Wallet',
                                    sourceName: 'Solar Holdings',
                                    color: 'legendaryGreen',
                                },
                                {
                                    __typename: 'Transfer',
                                    id: '4718e0f4-a966-474d-a843-a254bc33bebb',
                                    status: 'COMPLETE',
                                    type: 'DIVIDEND',
                                    sourceAccount: {
                                        id: 'da3b0d9a-c4d5-4e2e-adf4-434a0307c6f9',
                                        name: 'Solar Holdings',
                                        type: 'SAVINGS',
                                        mask: 4389,
                                    },
                                    destinationAccount: {
                                        id: 'e76df244-c0af-4de0-a312-6667e33e4004',
                                        name: 'Legends Wallet',
                                        type: 'WALLET',
                                        mask: null,
                                    },
                                    amount: '$89.19',
                                    created: 1649262278000,
                                    title: 'Dividend Payment',
                                    destinationName: 'Legends Wallet',
                                    sourceName: 'Solar Holdings',
                                    color: 'legendaryGreen',
                                },
                            ]}
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
