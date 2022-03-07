import React from "react";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import LoadingComponent from "./loading_component";
import { useUser, useDatabase, useDatabaseObjectData } from "reactfire";
function UserDebugPaper(props) {
    const database = useDatabase();
    const { userStatus, data: user } = useUser();
    const { status, data: userData } = useDatabaseObjectData(
        ref(database, "user/" + user.uid)
    );

    if (status === "loading") {
        return <LoadingComponent></LoadingComponent>;
    }

    return (
        <Paper sx={{ minWidth: 275 }} variant="container">
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                User Debug Info
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Email
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {user.email}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Address
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData
                    ? `${userData.address.streetNumber}, ${userData.address.city}, ${userData.address.state} ${userData.address.postalCode}`
                    : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                DOB
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData ? `${userData.dateOfBirth}` : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Last Sign In
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData
                    ? `${new Date(userData.state.signIn.lastSignInTime)}`
                    : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Sign Up State
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData ? `${userData.state.signUp}` : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Dwolla User Id
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData ? `${userData.dwolla.userId}` : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Phone {"("}
                {userData && userData.phone.verified
                    ? "verified"
                    : "unverified" + ")"}
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userData ? `${userData.phone.mobile}` : "error"}
            </Typography>
        </Paper>
    );
}
export default UserDebugPaper;
