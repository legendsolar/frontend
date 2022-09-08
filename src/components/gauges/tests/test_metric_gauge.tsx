import MetricGauge from '../metric_gauge';
import {unitOpts} from './defaults';

const TestMetricGauge = () => {
    return (
        <MetricGauge
            min={0}
            max={10}
            currentValue={5}
            unitOpts={unitOpts}
        ></MetricGauge>
    );
};

export default TestMetricGauge;
