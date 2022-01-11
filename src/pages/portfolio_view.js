import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database, firebaseApp } from "../Firebase";
import NavBar from "../components/nav_bar";
import { Container, Stack } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";

function PortfolioView(props) {
    const auth = useAuth();
    const user = auth.user;

    const [snapshots, loading, error] = useList(ref(database, "users"));

    if (!user) {
        console.log("Error, not signed in, auth state:");
        console.log(auth);
        return <div>Error, You're Not Signed In</div>;
    }

    return (
        <div>
            <NavBar></NavBar>
            {/* <NavBar></NavBar>
            <h3> User Info</h3>
            <Stack>
                <div>user uid: {user.uid}</div>
                <div>user email: {user.email}</div>
            </Stack>

            <h3>Production Overview</h3>

            <Stack></Stack>

            <h3>Assets Performance</h3>

            <Container></Container> */}
        </div>
    );
}

PortfolioView.propTypes = {};

export default PortfolioView;
