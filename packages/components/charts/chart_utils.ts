import {eachHourOfInterval, subMinutes} from 'date-fns';
import {useMemo} from 'react';
import {BoundedDimentions} from '../hooks/use_chart_dimensions';
import {GenerationDatum} from '../schema/schema_gen_types';

import * as d3 from 'd3';

const parseDate = (date: string) => new Date(date);
export const yAccessor = (d: GenerationDatum) => d.wattage;
export const xAccessor = (d: GenerationDatum) => parseDate(d.time);

export const dateToNumber = (d: Date) => d.getTime();

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
const useLineChartData = ({
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
            (a, b) => xAccessor(a).getTime() - xAccessor(b).getTime(),
        );

        const unitsAllowed = Math.min(
            Math.max(
                Math.floor(
                    (dms.boundedWidth - dms.marginLeft - dms.marginRight) /
                        pixelsPerUnit,
                ),
                minUnitsDisplayed,
            ),
            maxUnitsDisplayed,
        );

        const minDate = subUnit(
            xAccessor(sortedData[sortedData.length - 1]),
            unitsAllowed,
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

export const useBarChartData = ({
    rawData,
    dms,
    loading,
    error,
    pixelsPerUnit,
    minUnitsDisplayed,
    maxUnitsDisplayed,
    subUnit,
}: useLineChartDataProps) => {
    const data = useMemo<Array<GenerationDatum>>(() => {
        if (loading || error) {
            return [];
        }

        const sortedData = rawData.sort(
            (a, b) => xAccessor(a).getTime() - xAccessor(b).getTime(),
        );

        console.log({sortedData});

        const unitsAllowed = Math.min(
            Math.max(
                Math.floor(
                    (dms.boundedWidth - dms.marginLeft - dms.marginRight) /
                        pixelsPerUnit,
                ),
                minUnitsDisplayed,
            ),
            maxUnitsDisplayed,
        );

        console.log({unitsAllowed});

        if (unitsAllowed <= 0) {
            return [];
        }

        const maxDate = xAccessor(sortedData[sortedData.length - 1]);
        const minDate = subUnit(maxDate, unitsAllowed);

        console.log({minDate, maxDate});

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

        console.log({binnedData});

        const averagedBinData = binnedData.map(
            (arr: Array<GenerationDatum>, i: number): GenerationDatum => ({
                time: thresholds[i].toISOString(),
                wattage:
                    arr.reduce((sum, current) => sum + current.wattage, 0) /
                    arr.length,
            }),
        );

        return averagedBinData;
    }, [rawData, loading, error, dms.boundedWidth]);

    const max = Math.max.apply(data);

    return {data, max};
};
