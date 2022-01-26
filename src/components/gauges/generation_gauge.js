import React from "react";
import LiveMetricGauge from "./live_metric_gauge";

function GenerationGauge(props) {
    const factor = 1;
    const assetId = props.assetId;
    const displayOptions = {
        unit: "KW",
        unitDescription: "KILOWATTS",
        title: "Generation",
        strokeColor: "#EAB31E",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            displayOptions={displayOptions}
        ></LiveMetricGauge>
    );
}
export default GenerationGauge;
