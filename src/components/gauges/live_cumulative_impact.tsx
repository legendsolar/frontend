import {ref} from 'firebase/database';
import PropTypes from 'prop-types';
import CumulativeImpact from 'components/gauges/cumulative_impact';
import LoadingComponent from 'components/basics/loading_component';
import {useDatabase, useDatabaseObjectData} from 'reactfire';
import {UnitOpts} from './metric_gauge';

export const earningsUnitOpts: UnitOpts = {
    unit: 'DOLLARS',
    unitDescription: 'Dollars',
    title: 'Cash Earned',
    strokeColor: 'grassGreen',
    liveMessage: 'Updated 15 minutes ago',
};

export const generationUnitOpts: UnitOpts = {
    unit: 'KWH',
    unitDescription: 'KILOWATTS',
    title: 'Generation',
    strokeColor: 'pencilYellow',
    liveMessage: 'Updated 15 minutes ago',
};

export const carbonUnitOpts: UnitOpts = {
    unit: 'LBS',
    unitDescription: 'Pounds ',
    title: 'Carbon Aversion',
    strokeColor: 'skyBlue',
    liveMessage: 'Updated 15 minutes ago',
};

const EarningsCumulativeImpact = ({cumulativeData, live}) => {
    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={earningsUnitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

const CarbonCumulativeImpact = ({cumulativeData, live}) => {
    const unitOpts = {};

    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={carbonUnitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

const GenerationCumulativeImpact = ({cumulativeData, live}) => {
    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={generationUnitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

export {
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
    EarningsCumulativeImpact,
};
