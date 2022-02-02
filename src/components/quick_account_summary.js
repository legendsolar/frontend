import React from "react";
import { auth, database, firebaseApp } from "../Firebase";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MetricList from "./metric_list";
import { Typography } from "@mui/material";
import { useObject } from "react-firebase-hooks/database";

const QuickAccountSummary = (props) => {
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
        <Paper sx={{ width: 400, p: 2, height: 650 }}>
            <Stack>
                <Typography sx={{ fontSize: 14 }} variant="unitMainDisplay">
                    15 Panels
                </Typography>
                <Divider />
                <Typography sx={{ fontSize: 14 }} variant="unitMainDisplay">
                    All time impact
                </Typography>
                <MetricList
                    valuePairs={[
                        { metric: "DIVIDENDS EARNED", value: "$625" },
                        { metric: "KILOWATT HOURS GENERATED", value: "10,725" },
                        { metric: "CARBON AVERTED", value: "235 LBS" },
                    ]}
                ></MetricList>
                <Divider />
                <Typography sx={{ fontSize: 14 }} variant="unitMainDisplay">
                    Financial Return
                </Typography>
                <MetricList
                    valuePairs={[
                        { metric: "EST. NET PRESENT VALUE", value: "$625" },
                        { metric: "COMBINED NPV + DIVIDENDS", value: "10,725" },
                        { metric: "EST. NET ANNUAL RETURN", value: "235 LBS" },
                    ]}
                ></MetricList>
            </Stack>

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
};
export default QuickAccountSummary;
