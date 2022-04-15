import MetricGauge from '../metric_gauge';
import {unitOpts} from './defaults';

const TestMetricGauge = () => {
    return (
        <MetricGauge
            min={0}
            max={100}
            currentValue={50}
            unitOpts={unitOpts}
        ></MetricGauge>
    );
};

export default TestMetricGauge;
