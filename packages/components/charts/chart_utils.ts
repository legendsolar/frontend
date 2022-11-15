import { eachHourOfInterval, subMinutes } from "date-fns";
import { useMemo } from "react";
import { BoundedDimentions } from "@project/hooks/use_chart_dimensions";
import { GenerationDatum } from "../schema/schema_gen_types";

import * as d3 from "d3";

export const parseDate = (date: string) => new Date(date);
export const yAccessor = (d: GenerationDatum) => d.wattage;
export const xAccessor = (d: GenerationDatum) => parseDate(d.time);

export const dateToNumber = (d: Date) => d.getTime();
export const dStringToNumber = (d: string) => dateToNumber(parseDate(d));

interface useLineChartDataProps {
  rawData: Array<GenerationDatum>;
  dms: BoundedDimentions;
  loading: boolean;
  error: boolean;
  pixelsPerUnit: number;
  minUnitsDisplayed: number;
  maxUnitsDisplayed: number;
  subUnit(d: Date, u: number): Date;
}

/**
 * filters incoming data ensure min unit width
 *
 * @returns filtered data
 */
export const useLineChartData = ({
  rawData,
  dms,
  loading,
  error,
  pixelsPerUnit,
  minUnitsDisplayed,
  maxUnitsDisplayed,
  subUnit,
}: useLineChartDataProps): Array<GenerationDatum> => {
  const data = useMemo<Array<GenerationDatum>>(() => {
    if (loading || error) {
      return [];
    }

    const sortedData = rawData.sort(
      (a, b) => xAccessor(a).getTime() - xAccessor(b).getTime()
    );

    const unitsAllowed = Math.min(
      Math.max(
        Math.floor(
          (dms.boundedWidth - dms.marginLeft - dms.marginRight) / pixelsPerUnit
        ),
        minUnitsDisplayed
      ),
      maxUnitsDisplayed
    );

    const minDate = subUnit(
      xAccessor(sortedData[sortedData.length - 1]),
      unitsAllowed
    );

    const filteredData = sortedData.filter((d) => {
      if (!d) return false;
      return xAccessor(d).getTime() >= minDate.getTime();
    });

    /**
     * Add a tiny bit of data before the min date to
     * ensure a smooth worm transition to edge
     */

    filteredData.unshift({
      time: subMinutes(new Date(filteredData[0].time), 1).toISOString(),
      wattage: filteredData[0].wattage,
    });

    return filteredData;
  }, [rawData, loading, error, dms.boundedWidth]);

  return data;
};

interface useBarChartDataProps {
  rawData: Array<GenerationDatum>;
  dms: BoundedDimentions;
  loading: boolean;
  error: boolean;
  pixelsPerUnit: number;
  minUnitsDisplayed: number;
  maxUnitsDisplayed: number;
  subUnit(d: Date, u: number): Date;
  interpolateData: boolean;
}

export const useBarChartData = ({
  rawData,
  dms,
  loading,
  error,
  pixelsPerUnit,
  minUnitsDisplayed,
  maxUnitsDisplayed,
  subUnit,
  interpolateData,
}: useBarChartDataProps) => {
  const data = useMemo<Array<GenerationDatum>>(() => {
    if (loading || error) {
      return [];
    }

    const sortedData = rawData.sort(
      (a, b) => xAccessor(a).getTime() - xAccessor(b).getTime()
    );

    console.log({ sortedData });

    const unitsAllowed = Math.min(
      Math.max(
        Math.floor(
          (dms.boundedWidth - dms.marginLeft - dms.marginRight) / pixelsPerUnit
        ),
        minUnitsDisplayed
      ),
      maxUnitsDisplayed
    );

    console.log({ unitsAllowed });

    if (unitsAllowed <= 0) {
      return [];
    }

    const maxDate = xAccessor(sortedData[sortedData.length - 1]);
    const minDate = subUnit(maxDate, unitsAllowed);

    console.log({ minDate, maxDate });

    const thresholds = eachHourOfInterval({
      start: minDate,
      end: maxDate,
    });

    const binner = d3
      .bin()
      .value((d: GenerationDatum) => xAccessor(d).getTime())
      .domain([dateToNumber(minDate), dateToNumber(maxDate)])
      .thresholds(thresholds.map(dateToNumber));

    const binnedData = binner(sortedData);

    console.log({ binnedData });

    const interpolatedBinData = interpolateData
      ? binnedData.map((arr, i: number) => {
          if (arr.length === 0) {
            const leftDataPoint = binnedData
              .slice(0, i)
              .reverse()
              .find((arr) => arr.length);
            const rightDataPoint = binnedData
              .slice(i)
              .find((arr) => arr.length);

            const time = new Date((arr.x0 + arr.x1) / 2);

            if (!leftDataPoint) {
              return [
                {
                  wattage: rightDataPoint[0].wattage,

                  time: new Date((arr.x0 + arr.x1) / 2).toISOString(),
                },
              ];
            }

            if (!rightDataPoint) {
              return [
                {
                  wattage: leftDataPoint[0].wattage,

                  time: time.toISOString(),
                },
              ];
            }

            const interp = d3.interpolateNumber(
              leftDataPoint[0].wattage,
              rightDataPoint[0].wattage
            );

            const deltaT =
              dStringToNumber(rightDataPoint[0].time) -
              dStringToNumber(leftDataPoint[0].time);

            return [
              {
                wattage: interp(
                  (time.getTime() - dStringToNumber(leftDataPoint[0].time)) /
                    deltaT
                ),
                time: time.toISOString(),
              },
            ];
          }

          return arr;
        })
      : binnedData;

    const averagedBinData = interpolatedBinData.map(
      (arr: Array<GenerationDatum>, i: number): GenerationDatum => ({
        time: thresholds[i].toISOString(),
        wattage:
          arr.reduce((sum, current) => sum + current.wattage, 0) / arr.length,
      })
    );

    return averagedBinData;
  }, [rawData, loading, error, dms.boundedWidth, subUnit]);

  const max = Math.max(...data.map(yAccessor));

  return { data, max };
};
