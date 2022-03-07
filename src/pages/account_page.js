import { useRef } from "react";
import { useAuth } from "../hooks/use_auth";

import { Paper, Stack, Button } from "@mui/material";
import Wallet from "../components/wallet_component";
import UserInfo from "../components/user/modify_user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import AccountLinkComponent from "../components/account_link_component";

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
                        <UserInfo></UserInfo>
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
                        <AccountLinkComponent></AccountLinkComponent>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountView.propTypes = {};

export default AccountView;
