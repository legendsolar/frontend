import React from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { auth, database } from "./Firebase";
import NavBar from "./NavBar";
import { Container, Stack } from "react-bootstrap";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";

function UserHome(props) {
    const auth = getAuth();
    const user = auth.currentUser;

    const [snapshots, loading, error] = useList(ref(database, "users"));

    if (!user) {
        return <div>Error, User Not Signed In</div>;
    }

    return (
        <div>
            <NavBar></NavBar>
            <h3> User Info</h3>
            <Stack>
                <div>user uid: {user.uid}</div>
                <div>user email: {user.email}</div>
            </Stack>

            <h3>Production Overview</h3>

            <Stack></Stack>

            <h3>Assets Performance</h3>

            <Container></Container>
        </div>
    );
}

UserHome.propTypes = {};

export default UserHome;
