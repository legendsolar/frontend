import MetricGauge from '../metric_gauge';
import {unitOpts} from './defaults';

export const TestMetricGauge = () => {
    return (
        <MetricGauge
            min={0}
            max={10}
            currentValue={7.5}
            unitOpts={unitOpts}
            message={'Live Message'}
        ></MetricGauge>
    );
};
