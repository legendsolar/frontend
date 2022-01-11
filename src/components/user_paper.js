import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../Firebase";
import NavBar from "./nav_bar";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ComponentGrid from "./component_grid";

function UserPaper(props) {
    const auth = useAuth();
    const user = auth.user;

    if (!user) {
        return <> </>;
    }

    return (
        <Paper sx={{ minWidth: 275 }}>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                User Info
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.uid}</Typography>
        </Paper>
    );
}
export default UserPaper;
