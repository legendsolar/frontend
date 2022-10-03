import {numberFormatter} from 'utils/number_formatter';
import {UnitOpts} from '../metric_gauge';

export const unitOpts: UnitOpts = {
    title: 'Title',
    unit: 'unit',
    unitDescription: 'unit description',
    unitSubHeading: 'unit sub heading',
    strokeColor: 'legendaryGreen',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        return numberFormatter(u, width, true);
    },
};
