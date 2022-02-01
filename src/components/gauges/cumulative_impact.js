import MetricGauge from "./metric_gauge";
import { useState } from "react";
import { database } from "../../Firebase";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { differenceInMinutes } from "date-fns";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";

function CumulativeImpact(props) {
    const assetId = props.assetId;
    const unitConversionFactor_kW = props.unitConversionFactor_kW;
    const displayOptions = props.displayOptions;
    const unitLabel = props.unitLabel;

    var error = true;
    var loading = true;
    var cumValue_kWh = 0;
    var cumValue_unit = 0;
    var lastUpdateMinAgo = 0;

    var max = 0;

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    const [assetMetadataSnap, assetMetadataLoading, assetMetadataError] =
        useObject(ref(database, "assets/" + assetId));

    const [historyState, setHistoryState] = useState("week");

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
        cumValue_kWh = assetProdSummarySnap.val().last[historyState];
        cumValue_unit = cumValue_kWh * unitConversionFactor_kW;

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
        <Paper sx={{ p: 2 }}>
            <Typography variant="dashboardHeader" gutterBottom>
                {displayOptions.title}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: displayOptions.strokeColor,
                }}
                gutterBottom
            >
                {`${cumValue_unit.toFixed(2)}`}
            </Typography>

            <Typography
                sx={{
                    fontSize: 12,
                    fontFamily: "Azeret Mono",
                }}
                color="text.primary"
                gutterBottom
            >
                {displayOptions.unit}
            </Typography>
            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                AVG
            </Typography>

            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                -
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                BEST
            </Typography>

            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                -
            </Typography>
            <Stack direction="row" spacing={1}>
                <Chip
                    label={"Y2D"}
                    onClick={() => setHistoryState("year")}
                    clickable={true}
                    variant={historyState == "year" ? "filled" : "outlined"}
                    sx={{
                        textTransform: "uppercase",
                        fontFamily: "Azeret Mono",
                        fontSize: "9px",
                        lineHeight: "10.5px",
                    }}
                ></Chip>

                <Chip
                    label={"Month to Date"}
                    onClick={() => setHistoryState("month")}
                    clickable={true}
                    variant={historyState == "month" ? "filled" : "outlined"}
                    sx={{
                        textTransform: "uppercase",
                        fontFamily: "Azeret Mono",
                        fontSize: "9px",
                        lineHeight: "10.5px",
                    }}
                ></Chip>

                <Chip
                    label={"W2D"}
                    onClick={() => setHistoryState("week")}
                    clickable={true}
                    variant={historyState == "week" ? "filled" : "outlined"}
                    sx={{
                        textTransform: "uppercase",
                        fontFamily: "Azeret Mono",
                        fontSize: "9px",
                        lineHeight: "10.5px",
                    }}
                ></Chip>

                <Chip
                    label={"24H"}
                    onClick={() => setHistoryState("day")}
                    clickable={true}
                    variant={historyState == "day" ? "filled" : "outlined"}
                    sx={{
                        textTransform: "uppercase",
                        fontFamily: "Azeret Mono",
                        fontSize: "9px",
                        lineHeight: "10.5px",
                    }}
                ></Chip>
            </Stack>
        </Paper>
    );
}

export function EarningsCumulativeImpact(props) {
    const displayOptions = {
        unit: "DOLLARS",
        unitDescription: "Dollars",
        title: "Cash Earned",
        strokeColor: "#30A462",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <CumulativeImpact
            assetId={props.assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            displayOptions={displayOptions}
        ></CumulativeImpact>
    );
}

export function GenerationCumulativeImpact(props) {
    const displayOptions = {
        unit: "KWH",
        unitDescription: "KILOWATTS",
        title: "Generation",
        strokeColor: "#EAB31E",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <CumulativeImpact
            assetId={props.assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            displayOptions={displayOptions}
        ></CumulativeImpact>
    );
}

export function CarbonCumulativeImpact(props) {
    const displayOptions = {
        unit: "LBS",
        unitDescription: "Pounds ",
        title: "Carbon Aversion",
        strokeColor: "#477FB2",
    };

    const unitConversionFactor_kW = 0.15;

    return (
        <CumulativeImpact
            assetId={props.assetId}
            unitConversionFactor_kW={unitConversionFactor_kW}
            displayOptions={displayOptions}
        ></CumulativeImpact>
    );
}
