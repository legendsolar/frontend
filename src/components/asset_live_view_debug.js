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

    console.log("assets");

    const [liveProduction_w, setLiveProduction_w] = useState(0);

    if (!assetProdSummaryLoading && !assetProdError) {
        setLiveProduction_w(assetProdSummarySnap.recent.watts);
    }

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                Asset Live View
            </Typography>

            <Typography
                sx={{ fontSize: 18 }}
                color="text.secondary"
                gutterBottom
            >
                {liveProduction_w} W
            </Typography>
        </Paper>
    );
}
export default AssetLiveViewDebug;
