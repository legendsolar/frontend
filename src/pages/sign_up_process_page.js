import { useEffect, useState } from "react";
import {
    createDwollaAccount,
    getWalletBalance,
} from "../firebase/cloud_functions";
import { Typography, Stack, Paper } from "@mui/material";

import { useRef } from "react";
import PropTypes from "prop-types";
import { useList } from "react-firebase-hooks/database";
import { set, ref } from "firebase/database";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import AccreditationStatus from "../components/accreditation_status";
import UserInfo from "../components/user_info";
import AccountLinkComponent from "../components/account_link_component";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import LoadingView from "../views/loading_view";

export default function VerificationPage() {
    const auth = useAuth();
    const user = auth.user;

    const navigate = useNavigate();
    const contentRefs = useRef([]);
    const drawerTitles = [
        "Accreditation",
        "Information",
        "Link Financial Account",
    ];

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    const updateUserState = (newState) => {
        set(ref(database, "users/" + user.uid + "/state/signUp"), newState);
    };

    if (status === "loading") {
        return <LoadingView></LoadingView>;
    }

    return (
        <SideBarNavView
            drawer={
                <Stack spacing={2}>
                    <ScrollToSidebar
                        header={
                            <Stack sx={{ p: 2 }}>
                                <Typography variant="smallHeadline">
                                    Complete Your Account
                                </Typography>
                            </Stack>
                        }
                        contentTitles={drawerTitles}
                        refs={contentRefs}
                    ></ScrollToSidebar>
                </Stack>
            }
            mainContent={
                <Stack spacing={2}>
                    <Paper
                        sx={{}}
                        variant="container"
                        ref={(el) => (contentRefs.current[0] = el)}
                    >
                        <AccreditationStatus
                            onContinue={() => {}}
                        ></AccreditationStatus>
                    </Paper>

                    <Paper
                        sx={{}}
                        variant="container"
                        ref={(el) => (contentRefs.current[1] = el)}
                    >
                        <UserInfo></UserInfo>
                    </Paper>

                    <Paper
                        sx={{}}
                        variant="container"
                        ref={(el) => (contentRefs.current[2] = el)}
                    >
                        <AccountLinkComponent
                            onContinue={() => {
                                navigate("/explore");
                            }}
                        ></AccountLinkComponent>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
}
