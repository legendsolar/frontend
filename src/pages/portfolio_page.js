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
import {multiplyObject} from 'utils/object_utils';

const PortfolioPage = () => {
    const {useGetUserFacilities} = useUser();
    const {useGetFacilityDataByDate} = useFacilities();

    const [loadDate, setLoadTime] = useState(new Date());

    const {facilities, loading, error} = useGetUserFacilities();

    const facility = facilities ? facilities[0] : null;

    const {
        data,
        loading: dataLoading,
        error: dataError,
    } = useGetFacilityDataByDate({
        facilityId: 'qqWHzumNkaVmZEvGfZRnq3',
        startDate: subDays(loadDate, 6),
        endDate: loadDate,
    });

    const userHasFacilities = !!facilities;

    if (dataLoading || loading) {
        return <LoadingView></LoadingView>;
    }

    const mostRecentDatum = data ? data[data.length - 1] : undefined;

    const facilityMax_kW = facility.generationMetaData.max_kW;
    const dollar_per_kW = facility.generationMetaData.dollar_per_kW;
    const co2_per_kW = facility.generationMetaData.co2_per_kW;
    const current_kW = mostRecentDatum.wattage / 1000;

    const name = facility.name;
    const subtitle = `${facility.address.city}, ${facility.address.state}`;

    const cumulativeData = {
        day: facility?.summary.day,
        week: facility?.summary.weekToDate,
        month: facility?.summary.monthToDate,
        year: facility?.summary.yearToDate,
    };

    if (!userHasFacilities) {
        return (
            <SideBarNavView
                drawer={<AccountSummarySidebar></AccountSummarySidebar>}
                mainContent={<div></div>}
            ></SideBarNavView>
        );
    }

    return (
        <SideBarNavView
            drawer={
                <AccountSummarySidebar
                    name={name}
                    subtitle={subtitle}
                    panelCount={'25'}
                    costPerPanel={'800'}
                    totalInvestment={'20,000'}
                    kwTotal={facilityMax_kW.toFixed(1)}
                ></AccountSummarySidebar>
            }
            mainContent={
                <Stack spacing={4}>
                    <DefaultComponent sx={{m: 0, p: 0}}>
                        <Worm
                            rawData={data}
                            loading={dataLoading}
                            error={dataError}
                        ></Worm>
                    </DefaultComponent>

                    <div>
                        <Grid container columnSpacing={4}>
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
                                            cumulativeData={multiplyObject(
                                                cumulativeData,
                                                dollar_per_kW,
                                            )}
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
                                                    value: facility
                                                        ?.generationMetaData
                                                        ?.make,
                                                },

                                                {
                                                    metric: 'Installed Capacity',
                                                    value:
                                                        facilityMax_kW.toFixed(
                                                            1,
                                                        ) + 'kW',
                                                },
                                            ]}
                                        ></MetricListComponent>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <EarningsGauge
                                            max={facilityMax_kW * dollar_per_kW}
                                            currentValue_unit={
                                                current_kW * dollar_per_kW
                                            }
                                        ></EarningsGauge>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <GenerationCumulativeImpact
                                            live={true}
                                            cumulativeData={cumulativeData}
                                        ></GenerationCumulativeImpact>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <MetricListComponent
                                            title={'Economics'}
                                            valuePairs={[
                                                {
                                                    metric: 'PPA Offtaker Rate',
                                                    value:
                                                        dollar_per_kW.toFixed(
                                                            2,
                                                        ) + ' / kWh',
                                                },

                                                {
                                                    metric: 'PPA Duration',
                                                    value: facility?.economics
                                                        .ppaDuration,
                                                },

                                                {
                                                    metric: 'Lease Remaining',
                                                    value: facility.economics
                                                        .leaseRemaining,
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
                                            max={facilityMax_kW * co2_per_kW}
                                            currentValue_unit={
                                                current_kW * co2_per_kW
                                            }
                                        ></CarbonGauge>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <Stack spacing={1}>
                                            <Typography variant="smallHeadline">
                                                Dividend Summary
                                            </Typography>
                                            <Typography variant="label">
                                                Dividends will be transfered to
                                                your wallet on the first of
                                                every month.
                                            </Typography>
                                        </Stack>
                                        <TransferGrid
                                            transfers={portfolioPageTransfers}
                                        ></TransferGrid>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <CarbonCumulativeImpact
                                            live={true}
                                            cumulativeData={multiplyObject(
                                                cumulativeData,
                                                co2_per_kW,
                                            )}
                                        ></CarbonCumulativeImpact>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <GenerationGauge
                                            max={facilityMax_kW}
                                            currentValue_unit={
                                                mostRecentDatum.wattage / 1000
                                            }
                                        ></GenerationGauge>
                                    </DefaultComponent>

                                    <DefaultComponent>
                                        <MetricListComponent
                                            title={'Performance'}
                                            valuePairs={[
                                                {
                                                    metric: 'Uptime',
                                                    value: facility?.summary
                                                        .uptime_percentage,
                                                },

                                                {
                                                    metric: 'Performance Ratio',
                                                    value: facility?.summary
                                                        .performance_ratio,
                                                },

                                                {
                                                    metric: 'Total Generation To Date',
                                                    value:
                                                        facility?.summary.totalGeneration_kW.toFixed(
                                                            0,
                                                        ) + ' kW',
                                                },
                                            ]}
                                        ></MetricListComponent>
                                    </DefaultComponent>
                                </Stack>
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            }
        ></SideBarNavView>
    );
};

PortfolioPage.propTypes = {};

export default PortfolioPage;
