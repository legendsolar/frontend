import { useRef } from "react";
import SideBarNavView from "../views/side_bar_view";
import { Stack, Paper, Typography } from "@mui/material";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import { useAuth } from "../hooks/use_auth";
import MemberHeader from "../components/member_header";
import RecentTransfers from "../components/transactions/recent_transfers";
import Wallet from "../components/wallet_component";

const TransactionPage = (props) => {
    const auth = useAuth();
    const user = auth.user;

    const drawerTitles = ["Earnings", "All Transactions"];

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
                <Stack spacing={2}>
                    <Paper variant="container">
                        <Wallet></Wallet>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <RecentTransfers></RecentTransfers>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeading">
                            All Transactions
                        </Typography>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
