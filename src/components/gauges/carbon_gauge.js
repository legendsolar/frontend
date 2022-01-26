import React from "react";
import LiveMetricGauge from "./live_metric_gauge";

function CarbonGauge(props) {
    const factor = 0.1;
    const assetId = props.assetId;
    const displayOptions = {
        unit: "LBS",
        unitDescription: "Pounds per hour",
        title: "Carbon Aversion",
        strokeColor: "#477FB2",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            displayOptions={displayOptions}
        ></LiveMetricGauge>
    );
}
export default CarbonGauge;
