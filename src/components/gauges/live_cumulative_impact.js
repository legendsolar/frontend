import {ref} from 'firebase/database';
import PropTypes from 'prop-types';
import CumulativeImpact from 'components/gauges/cumulative_impact';
import LoadingComponent from 'components/utils/loading_component';
import {useDatabase, useDatabaseObjectData} from 'reactfire';

const EarningsCumulativeImpact = ({cumulativeData, live}) => {
    const unitOpts = {
        unit: 'DOLLARS',
        unitDescription: 'Dollars',
        title: 'Cash Earned',
        strokeColor: '#30A462',
    };

    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={unitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

EarningsCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const CarbonCumulativeImpact = ({cumulativeData, live}) => {
    const unitOpts = {
        unit: 'LBS',
        unitDescription: 'Pounds ',
        title: 'Carbon Aversion',
        strokeColor: '#477FB2',
    };

    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={unitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

CarbonCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const GenerationCumulativeImpact = ({cumulativeData, live}) => {
    const unitOpts = {
        unit: 'KWH',
        unitDescription: 'KILOWATTS',
        title: 'Generation',
        strokeColor: '#EAB31E',
    };

    return (
        <CumulativeImpact
            cumulativeData={cumulativeData}
            unitOpts={unitOpts}
            live={live}
        ></CumulativeImpact>
    );
};

GenerationCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

export {
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
    EarningsCumulativeImpact,
};
