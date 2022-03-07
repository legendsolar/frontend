import { useRef } from "react";
import { useAuth } from "../hooks/use_auth";

import { Typography, Paper, Stack, Button } from "@mui/material";
import Wallet from "../components/wallet_component";
import CreateDwollaAccount from "../components/identity/create_dwolla_account";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import AccountsComponent from "../components/accounts_component";

const AccountView = () => {
    const auth = useAuth();
    const user = auth.user;

    const contentRefs = useRef([]);

    const drawerTitles = ["Contact", "Wallet", "Accounts"];

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Stack sx={{ p: 2 }}>
                            <MemberHeader></MemberHeader>
                            <Button
                                variant="contained"
                                color="legendaryGreen"
                                onClick={() => auth.signout()}
                            >
                                Sign Out
                            </Button>
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
                        <CreateDwollaAccount></CreateDwollaAccount>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <Wallet></Wallet>
                    </Paper>

                    <Paper
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <AccountsComponent></AccountsComponent>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountView.propTypes = {};

export default AccountView;
