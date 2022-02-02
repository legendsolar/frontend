import MetricGauge from "./metric_gauge";
import { useState } from "react";
import { database } from "../../Firebase";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { differenceInMinutes } from "date-fns";
import PropTypes from "prop-types";
import CumulativeImpact from "./cumulative_impact";

const LiveCumulativeImpact = ({
    assetId,
    unitConversionFactor_kW,
    unitOpts,
}) => {
    var error = true;
    var loading = true;
    var lastUpdateMinAgo = 0;

    var convertedCumulativeData = {
        day: 0,
        week: 0,
        month: 0,
        year: 0,
    };

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
        lastUpdateMinAgo = differenceInMinutes(
            new Date(),
            new Date(assetProdSummarySnap.val().recent.time)
        );

        Object.entries(assetProdSummarySnap.val().last).forEach(
            ([key, value]) => {
                convertedCumulativeData[key] = value * unitConversionFactor_kW;
            }
        );
    } else {
        error = true;
    }

    return (
        <CumulativeImpact
            cumulativeData={convertedCumulativeData}
            unitOpts={unitOpts}
        ></CumulativeImpact>
    );
};

LiveCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
    unitConversionFactor_kW: PropTypes.number.isRequired,
    unitOpts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        unitDescription: PropTypes.string.isRequired,
        strokeColor: PropTypes.string.isRequired,
    }).isRequired,
};

const EarningsCumulativeImpact = ({ assetId }) => {
    const unitOpts = {
        unit: "DOLLARS",
        unitDescription: "Dollars",
        title: "Cash Earned",
        strokeColor: "#30A462",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

EarningsCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const CarbonCumulativeImpact = ({ assetId }) => {
    const unitOpts = {
        unit: "LBS",
        unitDescription: "Pounds ",
        title: "Carbon Aversion",
        strokeColor: "#477FB2",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

CarbonCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

const GenerationCumulativeImpact = ({ assetId }) => {
    const unitOpts = {
        unit: "KWH",
        unitDescription: "KILOWATTS",
        title: "Generation",
        strokeColor: "#EAB31E",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <LiveCumulativeImpact
            assetId={assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            unitOpts={unitOpts}
        ></LiveCumulativeImpact>
    );
};

GenerationCumulativeImpact.propTypes = {
    assetId: PropTypes.string.isRequired,
};

export {
    LiveCumulativeImpact,
    CarbonCumulativeImpact,
    GenerationCumulativeImpact,
    EarningsCumulativeImpact,
};
