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

function AssetLiveViewDebug(props) {
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";

    const [assetProdSummarySnap, assetProdSummaryLoading, assetProdError] =
        useObject(ref(database, "production/" + assetId + "/summary"));

    let watts = 0;

    if (assetProdSummarySnap && !assetProdSummaryLoading) {
        console.log(
            assetProdSummarySnap.val(),
            assetProdError,
            assetProdSummaryLoading
        );

        watts = assetProdSummarySnap.val().recent.watts;
    }

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                {assetProdSummaryLoading ? "Asset Data Loading" : "Asset Live"}
            </Typography>

            <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
            >
                {watts} W
            </Typography>
        </Paper>
    );
}
export default AssetLiveViewDebug;
