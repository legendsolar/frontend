import MetricGauge from "../components/gauges/metric_gauge";

const TestMetricGauge = () => <MetricGauge
        min={0} 
        max={100}
        currentValue={50}
        unitOpts={{
            title: "Title",
            unit: "unit",
            liveMessage: "LIVE",
            unitDescription: "unit description",
            strokeColor: "legendaryGreen",
        }}
    >
    </MetricGauge>

export default TestMetricGauge;