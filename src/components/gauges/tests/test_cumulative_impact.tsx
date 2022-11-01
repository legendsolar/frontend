import CumulativeImpact from '../cumulative_impact';
import {unitOpts} from './defaults';

const TestCumulativeImpact = () => {
    return (
        <CumulativeImpact
            cumulativeData={{
                day: {
                    current: 1,
                    best: 1,
                    average: 1,
                },
                month: {
                    current: 1,
                    best: 1,
                    average: 1,
                },

                week: {
                    current: 1,
                    best: 1,
                    average: 1,
                },
                year: {
                    current: 1,
                    best: 1,
                    average: 1,
                },
            }}
            unitOpts={unitOpts}
        ></CumulativeImpact>
    );
};

export default TestCumulativeImpact;
