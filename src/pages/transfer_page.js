import { useRef, useEffect } from "react";
import { useAuth } from "../hooks/use_auth";

import { Paper, Stack, Button, Typography } from "@mui/material";
import Wallet from "../components/wallet/wallet_component";
import ModifyUserInfo from "../components/user/modify_user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import AccountLinkComponent from "../components/transactions/account_link_component";
import CreateTransactionComponent from "../components/transactions/create_transaction_component";
import AccountListComponent from "../components/transactions/account_management_component";
import { useDispatch, useSelector } from "react-redux";
import { selectWalletBalance } from "../slices/wallet_slice";
import { fetchWalletBalance } from "../slices/wallet_slice";
import { useCloudFunctions } from "../hooks/use_cloud_functions";
import RecentTransfers from "../components/transactions/recent_transfers";
import AllTransfersDataGrid from "../components/all_transfers_data_grid";

const TransferPage = () => {
    const auth = useAuth();
    const cloudFunctions = useCloudFunctions();
    const dispatch = useDispatch();
    const user = auth.user;

    const balanceStatus = useSelector((state) => state.wallet.balance.status);
    const walletBalance = useSelector(selectWalletBalance);

    const balance = walletBalance ? walletBalance : "0.00";

    useEffect(() => {
        if (balanceStatus === "idle") {
            dispatch(fetchWalletBalance(cloudFunctions));
        }
    }, [balanceStatus, dispatch]);

    const contentRefs = useRef([]);

    const drawerTitles = [
        "Transfer Cash",
        "Connected Bank Accounts",
        "Recent Transactions",
    ];

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Stack sx={{ p: 2 }}>
                            <MemberHeader></MemberHeader>
                            <Typography variant="smallHeadline">
                                Balance
                            </Typography>
                            <Typography variant="headline1">
                                {"$" + balance}
                            </Typography>
                        </Stack>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={2}>
                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <CreateTransactionComponent></CreateTransactionComponent>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <AccountListComponent></AccountListComponent>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <RecentTransfers></RecentTransfers>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
};

TransferPage.propTypes = {};

export default TransferPage;
