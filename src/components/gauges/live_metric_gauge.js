import MetricGauge from "./metric_gauge";
import React from "react";
import { database } from "../../Firebase";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { differenceInMinutes } from "date-fns";

function LiveMetricGauge(props) {
    const assetId = props.assetId;
    const unitConversionFactor_kW = props.unitConversionFactor_kW;
    const displayOptions = props.displayOptions;

    var error = true;
    var loading = true;
    var currentValue_kW = 0;
    var currentValue_unit = 0;
    var lastUpdateMinAgo = 0;

    var max = 0;

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    const [assetMetadataSnap, assetMetadataLoading, assetMetadataError] =
        useObject(ref(database, "assets/" + assetId));

    if (assetProdSummaryLoading || assetMetadataLoading) {
        loading = true;
    } else if (
        assetProdSummarySnap &&
        assetMetadataSnap &&
        !assetProdSummaryLoading &&
        !assetMetadataLoading &&
        !assetProdError &&
        !assetMetadataError
    ) {
        currentValue_kW = assetProdSummarySnap.val().recent.wattage;
        currentValue_unit = (currentValue_kW / 1000) * unitConversionFactor_kW;

        lastUpdateMinAgo = differenceInMinutes(
            new Date(),
            new Date(assetProdSummarySnap.val().recent.time)
        );

        max =
            (assetMetadataSnap.val().productionData.maxRating_W / 1000) *
            unitConversionFactor_kW;
    } else {
        error = true;
    }

    return (
        <MetricGauge
            displayOptions={displayOptions}
            min={0}
            max={max}
            currentValue={currentValue_unit}
            isLive={true}
            liveMessage={`updated ${lastUpdateMinAgo} mins ago`}
        ></MetricGauge>
    );
}

export default LiveMetricGauge;
