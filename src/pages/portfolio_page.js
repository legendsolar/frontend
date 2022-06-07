import {Grid, Typography, Stack} from '@mui/material';
import Weather from 'components/weather/weather';
import PortfolioPlaceholder from 'components/placeholders/portfolio_placeholder';
import AccountSummarySidebar from 'components/user/account_summary_sidebar';
import {useUser} from 'hooks/use_user';
import useFacilities from 'hooks/use_facilities';
import ComponentGrid from 'layouts/component_grid';
import React, {useEffect, useState} from 'react';
import LoadingView from 'views/loading_view';
import SideBarNavView from 'views/side_bar_view';
import Worm from 'components/worm/worm';
import subDays from 'date-fns/subDays';
import DefaultComponent from 'components/utils/default_component';
import {portfolioPageTransfers} from 'static_data/placeholder_transfers';
import TransferGrid from 'components/transfers/transfer_grid';

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
import MetricList from 'components/summary/metric_list';
import MetricListComponent from 'components/summary/metric_list_component';

const PortfolioPage = () => {
    const {useGetUserFacilities} = useUser();
    const {useGetFacilityDataByDate} = useFacilities();

    const [loadDate, setLoadTime] = useState(new Date());

    const {facilities, loading, error} = useGetUserFacilities();

    console.log(loadDate);

    const {
        data,
        loading: dataLoading,
        error: dataError,
    } = useGetFacilityDataByDate({
        facilityId: 'umUfn1aQ6JYFJktF6wSMk',
        startDate: subDays(loadDate, 6),
        endDate: loadDate,
    });

    const userHasFacilities = !!facilities;

    if (dataLoading || loading) {
        return <LoadingView></LoadingView>;
    }

    const mostRecentDatum = data ? data[data.length - 1] : undefined;

    console.log({mostRecentDatum});

    if (!userHasFacilities) {
        return (
            <SideBarNavView
                drawer={<AccountSummarySidebar></AccountSummarySidebar>}
                mainContent={<PortfolioPage></PortfolioPage>}
            ></SideBarNavView>
        );
    }

    return (
        <SideBarNavView
            drawer={
                <AccountSummarySidebar
                    panelCount={'10'}
                    costPerPanel={'750'}
                    totalInvestment={'7500'}
                    kwTotal={'10'}
                ></AccountSummarySidebar>
            }
            mainContent={
                <div>
                    <Grid container rowSpacing={4} columnSpacing={4}>
                        <Grid item xs={12}>
                            <DefaultComponent sx={{m: 0, p: 0}}>
                                <Worm
                                    rawData={data}
                                    loading={dataLoading}
                                    error={dataError}
                                ></Worm>
                            </DefaultComponent>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Stack spacing={4}>
                                <DefaultComponent>
                                    <Weather
                                        temp={72}
                                        code={800}
                                        state={'Sunny'}
                                    ></Weather>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <EarningsCumulativeImpact
                                        live={true}
                                        cumulativeData={{
                                            day: 0.37,
                                            week: 1.85,
                                            month: 55.5,
                                            year: 670,
                                        }}
                                    ></EarningsCumulativeImpact>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <MetricListComponent
                                        title={'Specifications'}
                                        valuePairs={[
                                            {
                                                metric: 'Operating Since',
                                                value: 'July 2020',
                                            },

                                            {
                                                metric: 'Make & Model',
                                                value: 'Panasonic Evervolt',
                                            },

                                            {
                                                metric: 'Installed Capacity',
                                                value: '3.7kW',
                                            },
                                        ]}
                                    ></MetricListComponent>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <EarningsGauge
                                        max={0.5}
                                        currentValue_unit={0.21}
                                    ></EarningsGauge>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <GenerationCumulativeImpact
                                        live={true}
                                        cumulativeData={{
                                            day: 20,
                                            week: 20 * 7,
                                            month: 560,
                                            year: 7890,
                                        }}
                                    ></GenerationCumulativeImpact>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <MetricListComponent
                                        title={'Economics'}
                                        valuePairs={[
                                            {
                                                metric: 'PPA Offtaker Rate',
                                                value: '0.10 / kWh',
                                            },

                                            {
                                                metric: 'PPA Duration',
                                                value: '7 years',
                                            },

                                            {
                                                metric: 'Lease Remaining',
                                                value: '7 years',
                                            },
                                        ]}
                                    ></MetricListComponent>
                                </DefaultComponent>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Stack spacing={4}>
                                <DefaultComponent>
                                    <CarbonGauge
                                        max={5}
                                        currentValue_unit={2.15}
                                    ></CarbonGauge>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <Typography variant="smallHeadline">
                                        Dividends
                                    </Typography>
                                    <TransferGrid
                                        transfers={portfolioPageTransfers}
                                    ></TransferGrid>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <CarbonCumulativeImpact
                                        live={true}
                                        cumulativeData={{
                                            day: 15.43,
                                            week: 15.76 * 7,
                                            month: 471.66,
                                            year: 5663.9,
                                        }}
                                    ></CarbonCumulativeImpact>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <GenerationGauge
                                        max={4}
                                        currentValue_unit={1.7}
                                    ></GenerationGauge>
                                </DefaultComponent>

                                <DefaultComponent>
                                    <MetricListComponent
                                        title={'Performance'}
                                        valuePairs={[
                                            {
                                                metric: 'Uptime',
                                                value: '99%',
                                            },

                                            {
                                                metric: 'Performance Ratio',
                                                value: '14.3',
                                            },

                                            {
                                                metric: 'Total Generation To Date',
                                                value: '5024 kWh',
                                            },
                                        ]}
                                    ></MetricListComponent>
                                </DefaultComponent>
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            }
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
