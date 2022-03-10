import { useRef } from "react";
import SideBarNavView from "../views/side_bar_view";
import { Stack, Paper, Typography } from "@mui/material";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import { useAuth } from "../hooks/use_auth";
import MemberHeader from "../components/member_header";
import RecentTransfers from "../components/transactions/recent_transfers";
import Wallet from "../components/wallet/wallet_component";
import DefaultComponent from "../components/default_component";

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

    var name = "";
    var memberInfo = "Member since 2022";

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
                <Stack spacing={4}>
                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <RecentTransfers></RecentTransfers>
                    </Paper>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Bank Transfers
                        </Typography>
                    </DefaultComponent>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investments
                        </Typography>
                    </DefaultComponent>

                    <DefaultComponent
                        variant="container"
                        ref={(el) => (contentRefs.current[3] = el)}
                    >
                        <Typography variant="smallHeadline">
                            All Transactions
                        </Typography>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
