import {ref} from 'firebase/database';
import PropTypes from 'prop-types';
import CumulativeImpact from 'components/gauges/cumulative_impact';
import LoadingComponent from 'components/utils/loading_component';
import {useDatabase, useDatabaseObjectData} from 'reactfire';

const LiveCumulativeImpact = ({assetId, unitConversionFactor_kW, unitOpts}) => {
    const database = useDatabase();

    var convertedCumulativeData = {
        day: 0,
        week: 0,
        month: 0,
        year: 0,
    };

    const {productionSummaryState, data: productionSummary} =
        useDatabaseObjectData(
            ref(database, 'production/' + assetId + '/summary'),
        );

    if (productionSummaryState === 'loading') {
        return <LoadingComponent></LoadingComponent>;
    }

    if (!productionSummary?.last) {
        return <></>;
    }

    Object.entries(productionSummary.last).forEach(([key, value]) => {
        convertedCumulativeData[key] = value * unitConversionFactor_kW;
    });

    return (
        <CumulativeImpact
            cumulativeData={convertedCumulativeData}
            unitOpts={unitOpts}
        ></CumulativeImpact>
    );
};

LiveCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
    unitConversionFactor_kW: PropTypes.number.isRequired,
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }).isRequired,
};

const EarningsCumulativeImpact = ({assetId}) => {
    const unitOpts = {
        unit: 'DOLLARS',
        unitDescription: 'Dollars',
        title: 'Cash Earned',
        strokeColor: '#30A462',
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

EarningsCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const CarbonCumulativeImpact = ({assetId}) => {
    const unitOpts = {
        unit: 'LBS',
        unitDescription: 'Pounds ',
        title: 'Carbon Aversion',
        strokeColor: '#477FB2',
    };

    const unitConversionFactor_kW = 0.12;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

CarbonCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const GenerationCumulativeImpact = ({assetId}) => {
    const unitOpts = {
        unit: 'KWH',
        unitDescription: 'KILOWATTS',
        title: 'Generation',
        strokeColor: '#EAB31E',
    };

    const unitConversionFactor_kW = 1;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

GenerationCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

export {
    LiveCumulativeImpact,
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
    EarningsCumulativeImpact,
};
