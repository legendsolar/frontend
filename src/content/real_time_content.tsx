import Component from 'components/basics/component';
import {
    GenerationDatum,
    GenerationMetaData,
    GenerationSummary,
} from 'schema/schema_gen_types';
import Worm from 'components/worm/worm';
import PlaceholderWorm from 'components/worm/placeholder_worm';
import {
    CarbonGauge,
    EarningsGauge,
    GenerationGauge,
} from 'components/gauges/live_metric_gauge';
import {Stack} from '@mui/material';
import {
    CarbonCumulativeImpact,
    EarningsCumulativeImpact,
    GenerationCumulativeImpact,
} from 'components/gauges/live_cumulative_impact';
import {summaryToCumulativeImpact} from 'components/gauges/transformers';
import LiveWeather from 'components/weather/weather_live';

interface RealTimeContent {
    generationMetaData: GenerationMetaData;
    generation: Array<GenerationDatum>;
    summary: GenerationSummary;
}

const RealTimeContent = ({
    generation,
    generationMetaData,
    summary,
}: RealTimeContent) => {
    const current_kW = generation[generation.length - 1].wattage / 1000;

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
                sx={{
                    backgroundColor: 'whiteFog.main',
                }}
            ></Worm>

            <Stack
                direction="row"
                justifyContent={'center'}
                sx={{pb: 4}}
                spacing={8}
            >
                <Stack spacing={8}>
                    <LiveWeather></LiveWeather>
                    <EarningsCumulativeImpact
                        cumulativeData={summaryToCumulativeImpact(summary)}
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
                    ></EarningsGauge>

                    <GenerationCumulativeImpact
                        cumulativeData={summaryToCumulativeImpact(summary)}
                        live={true}
                    ></GenerationCumulativeImpact>
                </Stack>
                <Stack spacing={8}>
                    <CarbonGauge
                        max={
                            generationMetaData.max_kW *
                            generationMetaData.co2_per_kWh
                        }
                        currentValue_unit={
                            current_kW * generationMetaData.co2_per_kWh
                        }
                    ></CarbonGauge>

                    <CarbonCumulativeImpact
                        cumulativeData={summaryToCumulativeImpact(summary)}
                        live={true}
                    ></CarbonCumulativeImpact>

                    <GenerationGauge
                        max={generationMetaData.max_kW}
                        currentValue_unit={current_kW}
                    ></GenerationGauge>
                </Stack>
            </Stack>
        </Component>
    );
};

export default RealTimeContent;