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
import AccountManagementComponent from "../components/transactions/account_list_component";

const AccountPage = () => {
    const auth = useAuth();
    const user = auth.user;

    const contentRefs = useRef([]);

    const drawerTitles = [
        "Personal Information",
        "Accreditation",
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
                        disabled={true}
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <Typography variant="smallHeadline">
                            Personal Information
                        </Typography>
                        <ModifyUserInfo></ModifyUserInfo>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={true}
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <AccreditationStatus></AccreditationStatus>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={false}
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <AccountManagementComponent></AccountManagementComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
};

AccountPage.propTypes = {};

export default AccountPage;
