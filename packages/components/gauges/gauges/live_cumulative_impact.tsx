import {ref} from 'firebase/database';
import PropTypes from 'prop-types';
import CumulativeImpact from 'components/gauges/cumulative_impact';
import LoadingComponent from 'components/basics/loading_component';
import {useDatabase, useDatabaseObjectData} from 'reactfire';
import {UnitOpts} from './metric_gauge';
import {currencyFormatter, numberFormatter} from 'utils/number_formatter';

export const earningsUnitOpts: UnitOpts = {
    unit: 'DOLLARS',
    unitDescription: 'Dollars',
    unitSubHeading: 'per hour',
    title: 'Cash Earned',
    strokeColor: 'grassGreen',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        if (includeUnit) {
            return currencyFormatter(u);
        } else {
            return `${numberFormatter(u, width, false)}`;
        }
    },
};

export const generationUnitOpts: UnitOpts = {
    unit: 'KWH',
    unitSubHeading: 'per hour',
    unitDescription: 'Kilowatts',
    title: 'Generation',
    strokeColor: 'pencilYellow',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        if (includeUnit) {
            return `${numberFormatter(u, width, true)} kWh`;
        } else {
            return `${numberFormatter(u, width, true)}`;
        }
    },
};

export const carbonUnitOpts: UnitOpts = {
    unit: 'LBS',
    unitDescription: 'Pounds ',
    unitSubHeading: 'per hour',
    title: 'Carbon Aversion',
    strokeColor: 'skyBlue',
    unitFormatter: (u: number, includeUnit: boolean = true, width?: number) => {
        if (includeUnit) {
            return `${numberFormatter(u, width, true)} LBS`;
        } else {
            return `${numberFormatter(u, width, true)}`;
        }
    },
};

const EarningsCumulativeImpact = ({cumulativeData, live}) => {
    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={earningsUnitOpts}
        ></CumulativeImpact>
    );
};

const CarbonCumulativeImpact = ({cumulativeData, live}) => {
    const unitOpts = {};

    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={carbonUnitOpts}
        ></CumulativeImpact>
    );
};

const GenerationCumulativeImpact = ({cumulativeData, live}) => {
    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={generationUnitOpts}
        ></CumulativeImpact>
    );
};

export {
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
    EarningsCumulativeImpact,
};
