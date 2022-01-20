import "chartjs-adapter-date-fns";
import React, { useRef, useState, useEffect } from "react";
import { useInterval } from "./Utility";
import ProductionWormGauge from "./ProductionWorm";

const ProductionWormGaugeAnimated = (props) => {
    const chartDataTime_ms = props.chartDataTime;
    const chartData_W = props.chartData_W;
    const params = props.params;

    const timeSeriesData = chartData_W;

    const animStepTime_ms =
        (params.animation.time_s / params.animation.steps) * 1000;
    const [animationStepIdx, setAnimationStepIdx] = useState(0);
    const dataAnimationStartIdx = Math.floor(
        (1 - params.animation.lengthHours / params.data.totalHours) *
            chartDataTime_ms.length
    );

    const dataIdxChangeReq = chartDataTime_ms.length - dataAnimationStartIdx;
    const dataAnimationIdx = Math.floor(
        params.animation.easingFunction(
            animationStepIdx,
            dataAnimationStartIdx,
            dataIdxChangeReq,
            params.animation.steps
        )
    );

    useInterval(
        () => {
            setAnimationStepIdx(animationStepIdx + 1);
        },
        animationStepIdx < params.animation.steps - 1 ? animStepTime_ms : null
    );

    let chartData = Array.from({ length: chartData_W.length }, (x, i) => {
        return i <= dataAnimationIdx ? timeSeriesData[i] : undefined;
    });

    if (params.animation.reset) {
        params.animation.reset(() => {
            setAnimationStepIdx(0);
        });
    }

    return (
        <ProductionWormGauge
            chartDataTime={chartDataTime_ms}
            chartData_W={chartData}
            params={params}
        />
    );
};

export default ProductionWormGaugeAnimated;
