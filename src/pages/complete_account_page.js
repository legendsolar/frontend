import { useEffect, useState } from "react";
import {
    createDwollaAccount,
    getUserSignUpState,
    getWalletBalance,
    returnKBASessionResponse,
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
import CreateDwollaAccount from "../components/identity/create_dwolla_account";
import AccountLinkComponent from "../components/account_link_component";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import LoadingView from "../views/loading_view";
import IdentityVerificationKBA from "../components/identity/identity_verification_kba";

import { getKBASession } from "../firebase/cloud_functions";
import ImageUpload from "../components/image_upload";
import DefaultComponent from "../components/default_component";

import { useSelector, useDispatch } from "react-redux";
import {
    fetchUserSignUpState,
    selectUserSignUpState,
} from "../slices/user_slice";
import IdentityVerificationFullSSN from "../components/identity/identity_verification_full_ssn";
import IdentityVerificationDocument from "../components/identity/identity_verification_document";
import DefaultView from "../views/default_view";

export default function VerificationPage() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const user = auth.user;

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status
    );
    const userSignUpState = useSelector(selectUserSignUpState);

    const requestUpdateState = () => {
        if (
            userSignUpStateStatus === "idle" ||
            userSignUpStateStatus === "succeeded"
        ) {
            dispatch(fetchUserSignUpState());
        }
    };

    useEffect(() => {
        requestUpdateState();
    }, []);

    const navigate = useNavigate();
    const contentRefs = useRef([]);
    const drawerTitles = [
        "Accreditation",
        "Information",
        "Identity Verification",
        "Link Financial Account",
    ];

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    const onComplete = () => {
        requestUpdateState();
    };

    if (status === "loading" || userSignUpStateStatus === "loading") {
        return <LoadingView></LoadingView>;
    }

    if (userSignUpState === "INSTITUTION_LINK_COMPLETE") {
        navigate("/explore");
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
                    <DefaultComponent
                        disabled={userSignUpState !== "ACCOUNT_CREATED"}
                    >
                        <AccreditationStatus
                            onComplete={onComplete}
                        ></AccreditationStatus>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={
                            userSignUpState !== "ACCREDATION_VERIF_COMPLETE"
                        }
                    >
                        <CreateDwollaAccount
                            onComplete={onComplete}
                        ></CreateDwollaAccount>
                    </DefaultComponent>

                    {userSignUpState === "DWOLLA_ACCOUNT_RETRY_REQ" && (
                        <DefaultComponent disabled={true}>
                            <IdentityVerificationFullSSN
                                onComplete={onComplete}
                            ></IdentityVerificationFullSSN>
                        </DefaultComponent>
                    )}

                    {userSignUpState === "DWOLLA_ACCOUNT_KBA_REQ" && (
                        <DefaultComponent disabled={true}>
                            <IdentityVerificationKBA
                                onComplete={onComplete}
                            ></IdentityVerificationKBA>
                        </DefaultComponent>
                    )}

                    {userSignUpState === "DWOLLA_ACCOUNT_DOCUMENT_REQ" && (
                        <DefaultComponent disabled={true}>
                            <IdentityVerificationDocument
                                onComplete={onComplete}
                            ></IdentityVerificationDocument>
                        </DefaultComponent>
                    )}

                    <DefaultComponent
                        disabled={userSignUpState !== "DWOLLA_ACCOUNT_VERIFIED"}
                    >
                        <AccountLinkComponent
                            onLinkComplete={onComplete}
                            onContinue={() => {
                                if (
                                    userSignUpState ===
                                    "INSTITUTION_LINK_COMPLETE"
                                ) {
                                    navigate("/explore");
                                }
                            }}
                        ></AccountLinkComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
}
