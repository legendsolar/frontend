import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../Firebase";
import NavBar from "./nav_bar";
import { ref } from "firebase/database";
import { useState } from "react";

import { useAuth } from "../hooks/use_auth";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ComponentGrid from "./component_grid";
import { useObject } from "react-firebase-hooks/database";
import { format } from "date-fns";

function AssetLiveViewDebug(props) {
    const assetId = props.assetId;

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    const [assetInfoSnap, assetInfoLoading, assetInfoError] = useObject(
        ref(database, "assets/" + assetId + "/")
    );

    let watts = 0;
    let lastUpdateTime = 0;
    let formattedDate = "";

    if (assetProdSummarySnap && !assetProdSummaryLoading) {
        watts = assetProdSummarySnap.val().recent.wattage;
        lastUpdateTime = new Date(
            parseInt(assetProdSummarySnap.val().recent.time)
        );
        formattedDate = format(lastUpdateTime, "Pp");
    }

    var location = "unknown";
    var name = "unknown";

    if (assetInfoSnap && !assetInfoLoading) {
        const assetInfo = assetInfoSnap.val();
        location = `${assetInfo.address.city}, ${assetInfo.address.state}`;
        name = assetInfo.name;
    }

    return (
        <Paper sx={{ minWidth: 275, p: 2 }}>
            <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
            >
                {name}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Current Production
            </Typography>

            <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
            >
                {(watts / 1000).toFixed(2)} kW
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                {"Last updated: " + formattedDate}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                {"Location: " + location}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                {"ID: " + assetId}
            </Typography>
        </Paper>
    );
}
export default AssetLiveViewDebug;
