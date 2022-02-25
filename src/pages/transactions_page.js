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
import { auth, database, firebaseApp } from "../firebase";
import { useAuth } from "../hooks/use_auth";
import {
    getFundingSourceName,
    getTransferAmount,
    getTransferArrayFromQuery,
    getTransferDestinationFundingId,
    getTransferId,
    getTransferSourceFundingId,
    openDwollaConnection,
} from "../dwolla/dwolla_api_interface";
import { dwollaCallWrapper } from "../firebase/cloud_functions";
import { dwollaSandboxConfig } from "../dwolla/dwolla_settings";
import MemberHeader from "../components/member_header";

const TransactionPage = (props) => {
    const auth = useAuth();
    const user = auth.user;
    const [dwolla, setDwolla] = useState(undefined);
    const [transactions, setTransactions] = useState([]);

    var userDwollaId = "f92da569-41ec-4aa9-ba36-2329b4d26b4b";

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

    const [userInfoSnap, userInfoSnapLoading, userInfoSnapError] = useObject(
        ref(database, "users/" + user.uid)
    );

    if (!!userInfoSnap && !userInfoSnapLoading && !userInfoSnapError) {
        const userInfoObj = userInfoSnap.val();
        name = userInfoObj.name.first + " " + userInfoObj.name.last;
    }

    var name = "";
    var memberInfo = "Member since 2022";

    // userDwollaId = userInfoObj.dwolla.userId;

    useEffect(() => {
        if (dwolla) {
            dwolla.searchTransfers(userDwollaId).then((transferObjects) => {
                console.log("dwolla transfer objects");
                console.log(transferObjects);
                const transferArray =
                    getTransferArrayFromQuery(transferObjects);

                const newTransferArray = [];

                console.log(transferArray);
                transferArray.forEach((transfer) => {
                    const sourceId = getTransferSourceFundingId(transfer);
                    const destId = getTransferDestinationFundingId(transfer);
                    console.log("dwolla");
                    console.log(sourceId);
                    console.log(destId);

                    Promise.all([
                        dwolla.getFundingSource(sourceId),
                        dwolla.getFundingSource(destId),
                    ]).then(([sourceFundingSource, destFundingSource]) => {
                        console.log("returned");
                        console.log(sourceFundingSource);
                        console.log(destFundingSource);

                        newTransferArray.push({
                            title: "Dividend Payment",
                            amount: getTransferAmount(transfer),
                            source:
                                "Source: " +
                                getFundingSourceName(sourceFundingSource),
                            destination:
                                "Destination: " +
                                getFundingSourceName(destFundingSource),
                            date: new Date(),
                            uid: getTransferId(transfer),
                        });

                        console.log("updated");
                        console.log(newTransferArray);

                        // hmmm

                        if (newTransferArray.length == 6) {
                            setTransactions(newTransferArray);
                        }
                    });
                });
            });
        }
    }, [dwolla]);

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={<MemberHeader sx={{ p: 2 }}></MemberHeader>}
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
                            transactions={transactions}
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
