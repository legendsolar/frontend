import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../Firebase";
import NavBar from "./nav_bar";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ComponentGrid from "./component_grid";
import { useList } from "react-firebase-hooks/database";

function UserAssetDebugPaper(props) {
    const auth = useAuth();
    const user = auth.user;

    const [userAssetSnapshots, userAssetSnapshotsLoading, userAssetError] =
        useList(ref(database, "users/" + user.uid + "/assets"));

    if (!userAssetSnapshotsLoading && !userAssetError) {
        userAssetSnapshots.map((v) => {
            console.log(v.val());
        });
    }

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                User Asset Debug Info
            </Typography>

            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                Assets
            </Typography>
            {!userAssetSnapshotsLoading && userAssetSnapshots && (
                <span>
                    {userAssetSnapshots.map((v) => (
                        <Typography sx={{ fontSize: 12 }}>
                            {v.val()}% subscription of asset ID:{v.key}
                        </Typography>
                    ))}
                </span>
            )}
        </Paper>
    );
}
export default UserAssetDebugPaper;
