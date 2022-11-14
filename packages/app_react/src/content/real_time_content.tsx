import {Component} from '@project/components/basics/component';
import {Facility, GenerationDatum} from '@p/schema';
import {Worm} from '@project/components/charts/worm';
// import {
//     CarbonGauge,
//     EarningsGauge,
//     GenerationGauge,
// } from '@project/components/gauges/live_metric_gauge';
import {Stack, Typography, Grid} from '@mui/material';
// import {
//     CarbonCumulativeImpact,
//     EarningsCumulativeImpact,
//     GenerationCumulativeImpact,
// } from '@project/components/gauges/live_cumulative_impact';
import {summaryToCumulativeImpact} from '@project/components/gauges/transformers';
import {themeOptions} from '@project/components/theme';
import {eraserRed} from '@project/components/static/colors';
import {multiplyObject} from '@p/utils/object_utils';

interface RealTimeContent {
    facility: Facility;
    generation: Array<GenerationDatum>;
    dataStale: boolean;
    message?: string;
}

const RealTimeContent = ({
    facility: {generationMetaData, summary, location},
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
            <Worm
                rawData={generation}
                loading={false}
                error={false}
                nightThreshold_W={(generationMetaData.max_kW * 1000) / 3}
                max_W={generationMetaData.max_kW * 1000}
                sx={{
                    backgroundColor: 'whiteFog.main',
                }}
            ></Worm>

            {/* <Grid container rowSpacing={4} sx={{pl: {md: 4, xs: 0}, pb: 4}}>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={4}>
                        <LiveWeather
                            lat={location?.lat || 40.712778}
                            lng={location?.lng || -74.006111}
                        ></LiveWeather>
                        <EarningsCumulativeImpact
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(summary),
                                generationMetaData.dollar_per_kWh,
                            )}
                            live={true}
                        ></EarningsCumulativeImpact>
                        <EarningsGauge
                            max={
                                generationMetaData.max_kW *
                                generationMetaData.dollar_per_kWh
                            }
                            currentValue_unit={
                                current_kW * generationMetaData.dollar_per_kWh
                            }
                            message={message}
                        ></EarningsGauge>

                        <GenerationCumulativeImpact
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(summary),
                                1,
                            )}
                            live={true}
                        ></GenerationCumulativeImpact>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={4}>
                        <CarbonGauge
                            max={
                                generationMetaData.max_kW *
                                generationMetaData.co2_per_kWh
                            }
                            currentValue_unit={
                                current_kW * generationMetaData.co2_per_kWh
                            }
                            message={message}
                        ></CarbonGauge>

                        <CarbonCumulativeImpact
                            cumulativeData={multiplyObject(
                                summaryToCumulativeImpact(summary),
                                generationMetaData.co2_per_kWh,
                            )}
                            live={true}
                        ></CarbonCumulativeImpact>

                        <GenerationGauge
                            max={generationMetaData.max_kW}
                            currentValue_unit={current_kW}
                            message={message}
                        ></GenerationGauge>
                    </Stack>
                </Grid>
            </Grid> */}
        </Component>
    );
};

export default RealTimeContent;
