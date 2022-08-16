import Component from 'components/basics/component';
import {
    GenerationDatum,
    GenerationMetaData,
    GenerationSummary,
} from 'schema/schema_gen_types';
import Worm from 'components/worm/worm';
import PlaceholderWorm from 'components/worm/placeholder_worm';
import {CarbonGauge} from 'components/gauges/live_metric_gauge';
import {Stack} from '@mui/material';
import {EarningsCumulativeImpact} from 'components/gauges/live_cumulative_impact';
import {summaryToCumulativeImpact} from 'components/gauges/transformers';

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
    const current_W = generation[generation.length - 1].wattage;

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
                nightThreshold_W={generationMetaData.max_kW / 3}
                sx={{
                    backgroundColor: 'whiteFog.main',
                }}
            ></Worm>

            <Stack direction="row">
                <Stack>
                    <CarbonGauge
                        max={
                            generationMetaData.max_kW *
                            generationMetaData.co2_per_kWh
                        }
                        currentValue_unit={
                            current_W * generationMetaData.co2_per_kWh
                        }
                    ></CarbonGauge>
                </Stack>
                <Stack>
                    <Component>
                        <EarningsCumulativeImpact
                            cumulativeData={summaryToCumulativeImpact(summary)}
                            live={true}
                        ></EarningsCumulativeImpact>
                    </Component>
                    <CarbonGauge
                        max={
                            generationMetaData.max_kW *
                            generationMetaData.co2_per_kWh
                        }
                        currentValue_unit={
                            current_W * generationMetaData.co2_per_kWh
                        }
                    ></CarbonGauge>
                </Stack>
            </Stack>
        </Component>
    );
};

export default RealTimeContent;
