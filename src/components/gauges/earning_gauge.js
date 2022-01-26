import React from "react";
import LiveMetricGauge from "./live_metric_gauge";

function EarningsGauge(props) {
    const factor = 0.15;
    const assetId = props.assetId;
    const displayOptions = {
        unit: "USD",
        unitDescription: "Dollars per hour",
        title: "Earnings",
        strokeColor: "#30A462",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            displayOptions={displayOptions}
        ></LiveMetricGauge>
    );
}
export default EarningsGauge;
