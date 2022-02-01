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
        <Paper sx={{ p: 2, width: 400, height: 288 }}>
            <Stack
                justifyContent="space-between"
                spacing={1}
                sx={{ height: "100%" }}
            >
                <Typography variant="dashboardHeader" gutterBottom>
                    {displayOptions.title}
                </Typography>

                <Stack direction="row" justifyContent="space-evenly">
                    <Stack>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            align="center"
                            gutterBottom
                        >
                            AVG
                        </Typography>

                        <Typography
                            sx={{ fontSize: 18 }}
                            color="text.primary"
                            align="center"
                        >
                            -
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography
                            variant="unitMainDisplay"
                            sx={{
                                color: displayOptions.strokeColor,
                            }}
                            gutterBottom
                            align="center"
                        >
                            {`${cumValue_unit.toFixed(2)}`}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 12,
                                fontFamily: "Azeret Mono",
                            }}
                            color="text.primary"
                            align="center"
                        >
                            {displayOptions.unit}
                        </Typography>
                    </Stack>
                    <Stack>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                            align="center"
                        >
                            BEST
                        </Typography>

                        <Typography
                            sx={{ fontSize: 18 }}
                            color="text.primary"
                            align="center"
                        >
                            -
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-evenly"
                >
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
                        variant={
                            historyState == "month" ? "filled" : "outlined"
                        }
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
