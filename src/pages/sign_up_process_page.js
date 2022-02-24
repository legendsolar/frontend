import { useEffect, useState } from "react";
import {
    createDwollaAccount,
    getWalletBalance,
} from "../firebase/cloud_functions";
import {
    Typography,
    Box,
    Stack,
    TextField,
    CssBaseline,
    Button,
    Paper,
    Collapse,
    Alert,
    IconButton,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";

import { useRef } from "react";
import PropTypes from "prop-types";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import MemberHeader from "../components/member_header";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import AccreditationStatus from "../components/accreditation_status";
import UserInfo from "../components/user_info";

export default function VerificationPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const contentRefs = useRef([]);
    const drawerTitles = [
        "Username & Password",
        "Accreditation",
        "Banking Information",
    ];
    return (
        <SideBarNavView
            drawer={
                <Stack spacing={2}>
                    <ScrollToSidebar
                        header={
                            <Stack sx={{ p: 2 }}>
                                <Typography>Create Account</Typography>
                            </Stack>
                        }
                        contentTitles={drawerTitles}
                        refs={contentRefs}
                    ></ScrollToSidebar>
                </Stack>
            }
            mainContent={
                <Stack spacing={2}>
                    <Paper sx={{}} variant="container">
                        <UserInfo></UserInfo>
                    </Paper>
                    <Paper sx={{}} variant="container">
                        <AccreditationStatus></AccreditationStatus>
                    </Paper>
                </Stack>
            }
        ></SideBarNavView>
    );
}
