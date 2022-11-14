import MetricGauge from '../gauges/metric_gauge';
import React from 'react';
import {
    carbonUnitOpts,
    earningsUnitOpts,
    generationUnitOpts,
} from './live_cumulative_impact';

export const CarbonGauge = ({max, currentValue_unit, message}) => {
    return (
        <MetricGauge
            unitOpts={carbonUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
            message={message}
        ></MetricGauge>
    );
};

export const GenerationGauge = ({max, currentValue_unit, message}) => {
    return (
        <MetricGauge
            unitOpts={generationUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
            message={message}
        ></MetricGauge>
    );
};

export const EarningsGauge = ({max, currentValue_unit, message}) => {
    return (
        <MetricGauge
            unitOpts={earningsUnitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
            message={message}
        ></MetricGauge>
    );
};

export {CarbonGauge, GenerationGauge, EarningsGauge};
