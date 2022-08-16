import {GenerationSummary} from 'schema/schema_gen_types';

export const summaryToCumulativeImpact = (summary: GenerationSummary) => {
    return {
        day: summary.twentyFourHourGeneration_kWh,
        week: summary.pastWeek_kWh,
        month: summary.pastMonthGeneration_kWh,
        year: summary.pastYearGeneration_kWh,
    };
};
