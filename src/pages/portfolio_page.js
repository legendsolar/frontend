import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../Firebase";
import NavBar from "../components/nav_bar";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import ComponentGrid from "../components/component_grid";
import DefaultView from "../views/default_view";

function PortfolioPage(props) {
    const auth = useAuth();
    const user = auth.user;

    const [snapshots, loading, error] = useList(ref(database, "users"));

    if (!user) {
        console.log("Error, not signed in, auth state:");
        console.log(auth);
        return <div>Error, You're Not Signed In</div>;
    }

    return (
        <DefaultView>
            <ComponentGrid></ComponentGrid>
        </DefaultView>
    );
}

PortfolioPage.propTypes = {};

export default PortfolioPage;
