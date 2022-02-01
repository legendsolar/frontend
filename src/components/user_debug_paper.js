import React from "react";
import { auth, database, firebaseApp } from "../Firebase";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";

function UserDebugPaper(props) {
    const auth = useAuth();
    const user = auth.user;

    const [userDataSnap, userDataLoading, userDataError] = useObject(
        ref(database, "users/" + user.uid)
    );

    if (!userDataSnap || userDataLoading) {
        return <> </>;
    }

    const userDatabaseObj = userDataSnap.val();

    const userData = userDatabaseObj.info;

    const userMetaData = userDataSnap.metadata;

    return (
        <Paper sx={{ minWidth: 275, p: 2 }}>
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
                    ? `${userData.streetAddress}, ${userData.city}, ${userData.state}`
                    : "error"}
            </Typography>

            <Typography
                sx={{ fontSize: 12 }}
                color="text.secondary"
                gutterBottom
            >
                Last Log In
            </Typography>

            <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                {userMetaData ? `${userMetaData.lastSignInTime}` : "error"}
            </Typography>
        </Paper>
    );
}
export default UserDebugPaper;
