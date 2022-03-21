import { useRef } from "react";
import { useAuth } from "../hooks/use_auth";

import {
    Paper,
    Stack,
    Button,
    Typography,
    ListItemButton,
} from "@mui/material";
import Wallet from "../components/wallet/wallet_component";
import ModifyUserInfo from "../components/user/modify_user_info";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import AccountLinkComponent from "../components/transactions/account_link_component";
import DefaultComponent from "../components/default_component";
import AccreditationStatus from "../components/accreditation_status";
import AccountManagementComponent from "../components/transactions/account_management_component";
import UpdateUserInfo from "../components/identity/update_user_info";

const AccountPage = () => {
    const auth = useAuth();
    const user = auth.user;

    const contentRefs = useRef([]);

    const drawerTitles = [
        "Personal Information",
        "Bank Information",
        "Investments",
        "Communication",
    ];

    return (
        <SideBarNavView
            drawer={
                <ScrollToSidebar
                    header={
                        <Stack sx={{ p: 2 }}>
                            <MemberHeader></MemberHeader>
                        </Stack>
                    }
                    contentTitles={drawerTitles}
                    refs={contentRefs}
                    additionalButtons={
                        <ListItemButton
                            sx={{ ml: -4, mr: -4, height: "88px" }}
                            key={"logout"}
                            onClick={() => {
                                auth.signout();
                            }}
                        >
                            <Typography variant="subtitle1">Log Out</Typography>
                        </ListItemButton>
                    }
                ></ScrollToSidebar>
            }
            mainContent={
                <Stack spacing={6}>
                    <DefaultComponent
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Personal Information
                        </Typography>
                        <UpdateUserInfo></UpdateUserInfo>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={false}
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Connected Accounts
                        </Typography>
                        <AccountManagementComponent
                            includeWallet={false}
                        ></AccountManagementComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountPage.propTypes = {};

export default AccountPage;
