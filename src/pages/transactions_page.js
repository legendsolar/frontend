import { useRef } from "react";
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

const TransactionPage = (props) => {
    const auth = useAuth();
    const user = auth.user;

    const drawerTitles = [
        "Earnings",
        "Investments",
        "Bank Transfers",
        "All Transactions",
    ];

    const contentRefs = useRef([]);

    const [userInfoSnap, userInfoSnapLoading, userInfoSnapError] = useObject(
        ref(database, "users/" + user.uid)
    );

    var name = "";
    var memberInfo = "Member since 2022";

    if (!!userInfoSnap && !userInfoSnapLoading && !userInfoSnapError) {
        const userInfoObj = userInfoSnap.val();

        if (
            userInfoObj.info &&
            userInfoObj.info.firstName &&
            userInfoObj.info.lastName
        ) {
            name = userInfoObj.info.firstName + " " + userInfoObj.info.lastName;
        }
    }

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
                        ref={(el) => (contentRefs.current[3] = el)}
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
