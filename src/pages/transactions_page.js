import { useRef } from "react";
import SideBarNavView from "../views/side_bar_view";
import { Stack, Paper, Typography } from "@mui/material";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import { useAuth } from "../hooks/use_auth";
import MemberHeader from "../components/member_header";
import RecentTransfers from "../components/transactions/recent_transfers";
import Wallet from "../components/wallet/wallet_component";
import DefaultComponent from "../components/default_component";
import AllTransfersDataGrid from "../components/all_transfers_data_grid";

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
                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Dividend Earnings
                        </Typography>
                        <RecentTransfers></RecentTransfers>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Bank Transfers
                        </Typography>
                        <RecentTransfers></RecentTransfers>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Investments
                        </Typography>
                        <RecentTransfers></RecentTransfers>
                    </DefaultComponent>

                    <DefaultComponent
                        ref={(el) => (contentRefs.current[3] = el)}
                    >
                        <AllTransfersDataGrid></AllTransfersDataGrid>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

export default TransactionPage;
