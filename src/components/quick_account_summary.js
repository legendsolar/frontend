import React from "react";
import { auth, database, firebaseApp } from "../Firebase";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { Paper, Stack, Divider, Box } from "@mui/material";
import MetricList from "./summary/metric_list";
import { Typography, Container } from "@mui/material";
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

    const panels = Math.floor(Math.random() * 10 + 10);
    const kw_panel = 0.5;

    return (
        <Paper sx={{ width: "400px", m: 0, p: 0 }} variant="container">
            <Stack sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">{panels} Panels</Typography>

                    <Typography variant="body1">
                        {panels * kw_panel} Kw
                    </Typography>
                </Stack>

                <Box sx={{ height: "100px" }}></Box>

                <Stack direction="row" justifyContent="space-between">
                    <Stack>
                        <Typography variant="body1">$750</Typography>
                        <Typography variant="label">per panel</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="body1">${panels * 750}</Typography>
                        <Typography variant="label">
                            total investment
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 14 }} variant="subtitle1">
                    All time impact
                </Typography>
                <MetricList
                    valuePairs={[
                        { metric: "DIVIDENDS EARNED", value: "$625" },
                        { metric: "KILOWATT HOURS GENERATED", value: "10,725" },
                        { metric: "CARBON AVERTED", value: "235 LBS" },
                    ]}
                ></MetricList>
            </Stack>
            <Divider />
            <Stack sx={{ p: 2 }}>
                <Typography sx={{ fontSize: 14 }} variant="subtitle1">
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
        </Paper>
    );
};
export default QuickAccountSummary;
