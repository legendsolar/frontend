import {
  eachHourOfInterval,
  eachDayOfInterval,
  subMinutes,
  addHours,
  subDays,
  parseISO,
} from "date-fns";
import { useMemo } from "react";
import { BoundedDimentions } from "@project/hooks/use_chart_dimensions";
import { GenerationDatum } from "../schema/schema_gen_types";

import * as d3 from "d3";
import { Location } from "@p/schema";
import { getTimes } from "suncalc";
import tz_lookup from "tz-lookup";
import { getTimezoneOffset } from "date-fns-tz";
import { differenceInHoursFloat } from "@p/utils";

export const parseDate = (date: string) => new Date(date);

export const setDateToMidnight = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
};

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
  loading: boolean;
  error: boolean;
  daysToDisplay: number;
  barsPerDay: number;
  location: Location;
  timezone: string;
}

export interface Bar {
  startTime: Date;
  endTime: Date;
  wattage: number | undefined;
}

interface Day {
  bars: Array<Bar>;
  day: Date;
  total_kWh: number;
}

export const getTimesTz = (date: Date, lat: number, lng: number) => {
  const { sunrise, sunset } = getTimes(date, lat, lng);

  return {
    sunrise: new Date(sunrise.getTime()),
    sunset: new Date(sunset.getTime()),
  };
};

export const useBarChartData = ({
  rawData,
  loading,
  error,
  daysToDisplay,
  barsPerDay,
  location,
  timezone,
}: useBarChartDataProps) => {
  const dayBars = useMemo<Array<Day>>(() => {
    if (loading || error || daysToDisplay === 0) {
      return [];
    }

    const sorted = rawData.sort(
      (a, b) => xAccessor(a).getTime() - xAccessor(b).getTime()
    );

    console.log({ sorted });

    // bin data into days

    const maxDate = xAccessor(sorted[sorted.length - 1]);
    const minDisplayDate = subDays(maxDate, daysToDisplay);

    setDateToMidnight(minDisplayDate);

    const minDate =
      xAccessor(sorted[0]) < minDisplayDate
        ? minDisplayDate
        : xAccessor(sorted[0]);

    const days = eachDayOfInterval({
      start: minDate,
      end: maxDate,
    });

    const dayBinner = d3
      .bin()
      .value((d: GenerationDatum) => xAccessor(d))
      .domain([minDate, maxDate])
      .thresholds(days);

    const daysBinned = dayBinner(sorted);

    const dayBars: Array<Day> = daysBinned.map((dayBin: any) => {
      const day = new Date(dayBin.x0);

      const { sunrise, sunset } = getTimesTz(
        addHours(day, 1),
        location.lat,
        location.lng
      );

      const deltaT_ms = (sunset.getTime() - sunrise.getTime()) / barsPerDay;

      const barThresholds = Array.from({ length: barsPerDay }).map(
        (_, i) => new Date(sunrise.getTime() + deltaT_ms * i)
      );

      const barBinner = d3
        .bin()
        .value((d: GenerationDatum) => xAccessor(d))
        .domain([sunrise, sunset])
        .thresholds(barThresholds);

      const barBinnedData = barBinner(dayBin);

      const bars: Array<Bar> = barBinnedData.map((barBinned: any) => ({
        startTime: new Date(barBinned.x0),
        endTime: new Date(barBinned.x1),
        wattage:
          barBinned.length > 0
            ? barBinned.reduce(
                (sum: number, current: GenerationDatum) =>
                  sum + current.wattage,
                0
              ) / barBinned.length
            : undefined,
      }));

      const total_kWh =
        bars.reduce(
          (c, bar) =>
            c +
            (bar.wattage ? bar.wattage : 0) *
              differenceInHoursFloat(bar.startTime, bar.endTime),
          0
        ) / 1000;

      return { day, bars, total_kWh };
    });

    return dayBars;
  }, [rawData, daysToDisplay, barsPerDay, location, loading, error]);

  const max = Math.max(...rawData.map(yAccessor));

  return { dayBars: dayBars.slice(-daysToDisplay), max };
};
