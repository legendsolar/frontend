import CumulativeImpact from '../../cumulative_impact';
import {unitOpts} from './defaults';

const TestCumulativeImpact = () => {
    return (
        <CumulativeImpact
            cumulativeData={{
                day: 1,
                week: 10,
                month: 100,
                year: 1000,
            }}
            unitOpts={unitOpts}
        ></CumulativeImpact>
    );
};

export default TestCumulativeImpact;
