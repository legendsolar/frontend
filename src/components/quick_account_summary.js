import React from "react";
import { auth, database, firebaseApp } from "../Firebase";
import { ref } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MetricList from "./metric_list";
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

    return (
        <Paper>
            <Stack sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography>15 Panels</Typography>

                    <Typography>6 Kw</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography>$750 per panel</Typography>

                    <Typography>$11,250 total investment</Typography>
                </Stack>
            </Stack>
            <Divider />
            <Stack sx={{ p: 2 }}>
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
            </Stack>
            <Divider />
            <Stack sx={{ p: 2 }}>
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
        </Paper>
    );
};
export default QuickAccountSummary;
