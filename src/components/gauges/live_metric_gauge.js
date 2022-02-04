import MetricGauge from "./metric_gauge";
import React from "react";
import { database } from "../../Firebase";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { differenceInMinutes } from "date-fns";
import PropTypes from "prop-types";

const ErrorGauge = ({ unitOpts }) => {
    unitOpts.liveMessage = `Could not load data`;
    unitOpts.strokeColor = "#636E72";

    return (
        <MetricGauge
            unitOpts={unitOpts}
            min={0}
            max={1}
            currentValue={0}
            error={true}
        ></MetricGauge>
    );
};

ErrorGauge.propTypes = {
    unitOpts: PropTypes.shape({
        title: PropTypes.string,
        unit: PropTypes.string,
        unitDescription: PropTypes.string,
        strokeColor: PropTypes.string,
    }),
};

ErrorGauge.defaultProps = {
    unitOpts: {
        title: "Error",
        unit: "-",
        unitDescription: "-",
        strokeColor: "#636E72",
    },
};

const LiveMetricGauge = ({
    assetId,
    unitConversionFactor_kW,
    unitOpts,
    errorExt,
}) => {
    var error = errorExt;
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

    if (error) {
        return <ErrorGauge unitOpts={unitOpts}></ErrorGauge>;
    }

    return (
        <MetricGauge
            unitOpts={unitOpts}
            min={0}
            max={max}
            currentValue={currentValue_unit}
        ></MetricGauge>
    );
};

LiveMetricGauge.propTypes = {
    assetId: PropTypes.string.isRequired,
    unitConversionFactor_kW: PropTypes.number.isRequired,
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }).isRequired,
    errorExt: PropTypes.bool,
};

LiveMetricGauge.defaultProps = {
    errorExt: false,
};

const CarbonGauge = ({ assetId }) => {
    const factor = 0.1;
    const unitOpts = {
        unit: "LBS",
        unitDescription: "Pounds per hour",
        title: "Carbon Aversion",
        strokeColor: "#477FB2",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            unitOpts={unitOpts}
        ></LiveMetricGauge>
    );
};

CarbonGauge.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const GenerationGauge = ({ assetId }) => {
    const factor = 0.1;
    const unitOpts = {
        unit: "KW",
        unitDescription: "KILOWATTS",
        title: "Generation",
        strokeColor: "#EAB31E",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            unitOpts={unitOpts}
        ></LiveMetricGauge>
    );
};

GenerationGauge.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const EarningsGauge = ({ assetId }) => {
    const factor = 0.1;
    const unitOpts = {
        unit: "USD",
        unitDescription: "Dollars per hour",
        title: "Earnings",
        strokeColor: "#30A462",
    };

    return (
        <LiveMetricGauge
            unitConversionFactor_kW={factor}
            assetId={assetId}
            unitOpts={unitOpts}
        ></LiveMetricGauge>
    );
};

EarningsGauge.propTypes = {
    assetId: PropTypes.string.isRequired,
};

export {
    LiveMetricGauge,
    CarbonGauge,
    GenerationGauge,
    EarningsGauge,
    ErrorGauge,
};
