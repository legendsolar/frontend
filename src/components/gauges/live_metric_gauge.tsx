import MetricGauge from 'components/gauges/metric_gauge';
import React from 'react';
import {
    carbonUnitOpts,
    earningsUnitOpts,
    generationUnitOpts,
} from './live_cumulative_impact';

const CarbonGauge = ({max, currentValue_unit}) => {
    return (
        <MetricGauge
            unitOpts={carbonUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
        ></MetricGauge>
    );
};

const GenerationGauge = ({max, currentValue_unit}) => {
    return (
        <MetricGauge
            unitOpts={generationUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
        ></MetricGauge>
    );
};

const EarningsGauge = ({max, currentValue_unit}) => {
    return (
        <MetricGauge
            unitOpts={earningsUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
        ></MetricGauge>
    );
};

export {CarbonGauge, GenerationGauge, EarningsGauge};
