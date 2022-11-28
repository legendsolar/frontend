import { GenerationTotals, EarningsTotals } from "@p/schema";
import { CumulativeData } from "./cumulative_impact";

export const summaryToCumulativeImpact = (
  totals: GenerationTotals | EarningsTotals
): CumulativeData => {
  if (totals.__typename === "EarningsTotals") {
    return {
      day: totals.twentyFourHourEarnings_Dollars,
      week: totals.pastWeekEarnings_Dollars,
      month: totals.pastMonthEarnings_Dollars,
      year: totals.pastYearEarnings_Dollars,
    };
  }

  if (totals.__typename === "GenerationTotals") {
    return {
      day: totals.twentyFourHourGeneration_kWh,
      week: totals.pastWeek_kWh,
      month: totals.pastMonthGeneration_kWh,
      year: totals.pastYearGeneration_kWh,
    };
  }

  throw new Error("cannot transform total");
};
