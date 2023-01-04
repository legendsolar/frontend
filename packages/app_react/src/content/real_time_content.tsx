import {Component} from '@project/components/basics/component';
import {Facility, GenerationDatum, TransferType} from '@p/schema';
import {Worm} from '@project/components/charts/worm';
import {Stack, Typography, Grid} from '@mui/material';
import {CumulativeImpact, MetricGauge} from '@project/components/gauges';
import {summaryToCumulativeImpact} from '@project/components/gauges/transformers';
import {eraserRed} from '@project/components/static/colors';
import {multiplyObject} from '@p/utils/object_utils';
import {carbonEnglish, dollars, energy_kWh, watts_kW} from '@p/utils';
import {WeatherLive} from '@project/components/weather';
import {RecentTransfersComponent} from '@project/components/transfers';
import {DisplayTransfer} from '@project/components/transfers/types';
import {
    defaultBarChartDisplayParams,
    BarChart,
} from '@project/components/charts';

interface RealTimeContent {
    facility: Facility;
    transfers: Array<DisplayTransfer> | undefined;
    generation: Array<GenerationDatum> | undefined;
    dataStale: boolean;
    message?: string;
}

const RealTimeContent = ({
    facility: {generationMetaData, generationTotals, earningsTotals, location},
    transfers,
    generation,
    dataStale,
    message = '',
}: RealTimeContent) => {
    if (dataStale) {
        return (
            <Component
                standardWidth={false}
                sx={{
                    backgroundColor: 'whiteHaze.main',
                    width: '100%',
                    border: '3px solid ' + eraserRed,
                }}
            >
                <Stack>
                    <Typography variant={'headline2' as any}>
                        Some live data is not loading right now
                    </Typography>
                    <Typography variant={'body' as any}>
                        Don’t worry, this will not impact your earnings or
                        impact. Live data will return once the connection is
                        restored.
                    </Typography>
                </Stack>
            </Component>
        );
    }

    const current_kW = generation
        ? generation[generation.length - 1].wattage / 1000
        : 0;

    return (
        <Component
            standardWidth={false}
            sx={{
                backgroundColor: 'whiteHaze.main',
                width: '100%',
                p: 0,
                overflow: 'hidden',
            }}
        >
            <Component
                standardWidth={false}
                sx={{
                    m: 4,
                    mb: 0,
                    mr: {
                        xl: 5,
                        lg: 4,
                    },
                }}
                shadow={true}
            >
                <Typography variant={'smallHeadline' as any}>
                    Energy Generated
                </Typography>
                <BarChart
                    rawData={generation ? generation : []}
                    loading={false}
                    error={false}
                    options={defaultBarChartDisplayParams}
                    location={location}
                ></BarChart>
            </Component>
            <Grid container rowSpacing={4} sx={{pl: {md: 4, xs: 0}, pb: 4}}>
                <Grid item xs={12} lg={6}>
                    <Stack
                        spacing={4}
                        sx={{ml: {md: 'auto', xs: 4}, mr: {md: 'auto', xs: 4}}}
                    >
                        <WeatherLive
                            lat={location?.lat || 40.712778}
                            lng={location?.lng || -74.006111}
                        ></WeatherLive>
                        <CumulativeImpact
                            title="Cash earned"
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(earningsTotals),
                                generationMetaData.dollar_per_kWh,
                            )}
                            unit={dollars}
                        ></CumulativeImpact>
                        <MetricGauge
                            title="Cash earned"
                            min={0}
                            max={
                                generationMetaData.max_kW *
                                (generationMetaData.dollar_per_kWh
                                    ? generationMetaData.dollar_per_kWh
                                    : 0.15)
                            }
                            currentValue={
                                current_kW *
                                (generationMetaData.dollar_per_kWh
                                    ? generationMetaData.dollar_per_kWh
                                    : 0.15)
                            }
                            message={message}
                            unit={dollars}
                        ></MetricGauge>

                        <CumulativeImpact
                            title="Electricity generated"
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(generationTotals),
                                1,
                            )}
                            unit={energy_kWh}
                        ></CumulativeImpact>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack
                        spacing={4}
                        sx={{ml: {md: 'auto', xs: 4}, mr: {md: 'auto', xs: 4}}}
                    >
                        <MetricGauge
                            title="Carbon averted"
                            min={0}
                            max={
                                generationMetaData.max_kW *
                                generationMetaData.co2_per_kWh
                            }
                            currentValue={
                                current_kW * generationMetaData.co2_per_kWh
                            }
                            message={message}
                            unit={carbonEnglish}
                        ></MetricGauge>

                        {transfers && (
                            <RecentTransfersComponent
                                transfers={transfers.filter(
                                    (t) => t.type === TransferType.Dividend,
                                )}
                                loading={false}
                                title={'Dividends'}
                                widgetMode={false}
                            ></RecentTransfersComponent>
                        )}

                        <CumulativeImpact
                            title={'Carbon averted'}
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(generationTotals),
                                generationMetaData.co2_per_kWh,
                            )}
                            unit={carbonEnglish}
                        ></CumulativeImpact>

                        <MetricGauge
                            title="Electricity generated"
                            min={0}
                            max={generationMetaData.max_kW}
                            currentValue={current_kW}
                            message={message}
                            unit={watts_kW}
                        ></MetricGauge>
                    </Stack>
                </Grid>
            </Grid>
        </Component>
    );
};

export default RealTimeContent;
