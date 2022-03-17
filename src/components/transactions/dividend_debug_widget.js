import React from "react";
import { database } from "../../firebase";
import { ref } from "firebase/database";
import { useList } from "react-firebase-hooks/database";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useAuth } from "../../hooks/use_auth";

function DividendWidget(props) {
    const auth = useAuth();
    const user = auth.user;

    const [dividendsSnap, dividendLoading, dividendError] = useList(
        ref(database, "paymentHistory/users/" + user.uid)
    );

    if (dividendError) {
        console.log(dividendError);
    }

    if (dividendsSnap) {
        console.log(dividendsSnap);
    }

    return (
        <Paper
            sx={{
                minWidth: 275,
                p: 2,
                "& .MuiTextField-root": { m: 1 },
            }}
        >
            <Typography variant="smallHeadline">Dividends</Typography>

            {!dividendLoading &&
                !dividendError &&
                dividendsSnap.map((dividendSnap) => (
                    <div>
                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {`Dividend Id: ${dividendSnap.key}`}
                        </Typography>

                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {`Amount: $${dividendSnap
                                .val()
                                .amount_dollars.toFixed(2)}`}
                        </Typography>

                        <Typography
                            sx={{ fontSize: 12 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            {`Date: ${dividendSnap.val().date_ISO8601}`}
                        </Typography>
                    </div>
                ))}
        </Paper>
    );
}

export default DividendWidget;
