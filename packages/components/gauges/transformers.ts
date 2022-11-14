import {GenerationSummary} from '@p/schema';
import {CumulativeData} from './cumulative_impact';

export const summaryToCumulativeImpact = (
    summary: GenerationSummary,
): CumulativeData => {
    return {
        day: summary.twentyFourHourGeneration_kWh,
        week: summary.pastWeek_kWh,
        month: summary.pastMonthGeneration_kWh,
        year: summary.pastYearGeneration_kWh,
    };
};
