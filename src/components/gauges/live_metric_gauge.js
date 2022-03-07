import MetricGauge from "./metric_gauge";
import React from "react";
import { ref } from "firebase/database";
import { differenceInMinutes } from "date-fns";
import { useDatabase } from "reactfire";
import { useDatabaseObjectData } from "reactfire";
import PropTypes from "prop-types";
import LoadingComponent from "../loading_component";

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

const LiveMetricGauge = ({ assetId, unitConversionFactor_kW, unitOpts }) => {
    const database = useDatabase();

    const { metaDataStatus, data: metaData } = useDatabaseObjectData(
        ref(database, "assets/" + assetId)
    );

    const { productionSummaryState, data: productionSummary } =
        useDatabaseObjectData(
            ref(database, "production/" + assetId + "/summary")
        );

    if (metaDataStatus === "loading" || productionSummaryState === "loading") {
        return <LoadingComponent></LoadingComponent>;
    } else if (
        metaDataStatus === "error" ||
        productionSummaryState === "error"
    ) {
        return <ErrorGauge unitOpts={unitOpts}></ErrorGauge>;
    }

    if (!productionSummary?.recent) {
        return <ErrorGauge unitOpts={unitOpts}></ErrorGauge>;
    }

    const currentValue_kW = productionSummary.recent.wattage;
    const currentValue_unit =
        (currentValue_kW / 1000) * unitConversionFactor_kW;

    const lastUpdateMinAgo = differenceInMinutes(
        new Date(),
        new Date(productionSummary.recent.time)
    );

    const max =
        (metaData.productionData.maxRating_W / 1000) * unitConversionFactor_kW;

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
