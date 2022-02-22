import { useEffect, useMemo, useRef, useState } from "react";
import { Divider, Paper, Typography, Container } from "@mui/material/";
import useTheme from "@mui/material/styles/useTheme";
import SideBarNavView from "../views/side_bar_view";
import { Stack, List, ListItemText, ListItemButton } from "@mui/material";
import AllTransfersDataGrid from "../components/all_transfers_data_grid";
import TransactionGrid from "../components/transactions/transaction_grid";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import { useObject } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { auth, database, firebaseApp } from "../Firebase";
import { useAuth } from "../hooks/use_auth";
import { openDwollaConnection } from "../dwolla/dwolla_api_interface";
import { dwollaCallWrapper } from "../firebase/cloud_functions";
import { dwollaSandboxConfig } from "../dwolla/dwolla_settings";

const TransactionPage = (props) => {
    const auth = useAuth();
    const user = auth.user;
    const [dwolla, setDwolla] = useState(undefined);

    var userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";
    var transactions = [];

    useEffect(() => {
        openDwollaConnection(dwollaSandboxConfig.url, dwollaCallWrapper).then(
            (connection) => {
                console.log("created dwolla connection");
                console.log(connection);
                setDwolla(connection);
            }
        );
    }, []);

    const drawerTitles = ["Earnings", "All Transactions"];

    const contentRefs = useRef([]);

    // const [userInfoSnap, userInfoSnapLoading, userInfoSnapError] = useObject(
    //     ref(database, "users/" + user.uid)
    // );

    var name = "";
    var memberInfo = "Member since 2022";

    // if (!!userInfoSnap && !userInfoSnapLoading && !userInfoSnapError) {
    // const userInfoObj = userInfoSnap.val();

    // userDwollaId = userInfoObj.dwolla.userId;

    if (dwolla) {
        console.log(userDwollaId);
        console.log(dwolla);
        dwolla.searchTransfers(userDwollaId).then((transferObjects) => {
            console.log("dwolla transfer objects");
            console.log(transferObjects);
        });

        // dwolla
        //     .getTransferById("aaa90a90-fc90-ec11-813d-ca84ae5ee1fb")
        //     .then((transferObjects) => {
        //         console.log("dwolla transfer objects");
        //         console.log(transferObjects);
        //     });
    }

    //     if (
    //         userInfoObj.name &&
    //         userInfoObj.name.first &&
    //         userInfoObj.name.name
    //     ) {
    //         name = userInfoObj.name.first + " " + userInfoObj.name.last;
    //     }
    // }

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Stack sx={{ p: 2 }}>
                            <Typography variant="headline2">{name}</Typography>
                            <Typography variant="label">
                                {memberInfo}
                            </Typography>
                        </Stack>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={2}>
                    <div ref={(el) => (contentRefs.current[0] = el)}>
                        <TransactionGrid
                            ref={(el) => (contentRefs.current[0] = el)}
                            title="Dividend Payments"
                            transactions={Array.from({ length: 4 }, (x, i) => {
                                return {
                                    title: "Dividend Payment",
                                    amount: Math.random() * 50 + 50,
                                    source: "Barnyard Solar",
                                    destination: "Legends Wallet",
                                    date: new Date(),
                                    uid: i,
                                };
                            })}
                        ></TransactionGrid>
                    </div>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeading">
                            All Transactions
                        </Typography>

                        <AllTransfersDataGrid></AllTransfersDataGrid>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
