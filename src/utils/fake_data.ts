import {subDays} from 'date-fns';
import {GenerationDatum} from 'schema/schema_gen_types';

export const generateFakeProductionData = (
    daysBefore: number,
    max_W: number,
): Array<GenerationDatum> => {
    const N = 300;

    const now = new Date();

    const start = subDays(now, daysBefore);

    const interval = (now.getTime() - start.getTime()) / N;

    return Array.from({length: 300}, (_, i) => {
        return {
            time: new Date(start.getTime() + interval * i).toISOString(),
            wattage:
                max_W * Math.pow(Math.cos((i / N) * Math.PI * daysBefore), 4),
        };
    });
};
