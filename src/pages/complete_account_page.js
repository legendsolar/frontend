import { useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";
import { useRef } from "react";
import { ref } from "firebase/database";
import SideBarNavView from "../views/side_bar_view";
import ScrollToSidebar from "../components/scroll_to_sidebar";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import AccreditationStatus from "../components/accreditation_status";
import CreateDwollaAccount from "../components/identity/create_dwolla_account";
import AccountLinkComponent from "../components/transactions/account_link_component";
import { useDatabaseObjectData, useDatabase } from "reactfire";
import LoadingView from "../views/loading_view";
import IdentityVerificationKBA from "../components/identity/identity_verification_kba";
import DefaultComponent from "../components/default_component";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchUserSignUpState,
    selectUserSignUpState,
} from "../slices/user_slice";
import IdentityVerificationDocument from "../components/identity/identity_verification_document";
import DefaultView from "../views/default_view";
import { useCloudFunctions } from "../hooks/use_cloud_functions";
import scrollToEl from "../utils/scroll_to_el";

import LinearPageinatedView from "../views/linear_paginated_view";
import { signUpOrder, userSignUpOrder } from "../utils/user_sign_up_state";

const CompleteAccountPage = () => {
    const dispatch = useDispatch();
    const cloudFunctions = useCloudFunctions();
    const auth = useAuth();
    const user = auth.user;

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status
    );

    const userSignUpState = useSelector(selectUserSignUpState);

    const requestUpdateState = () => {
        if (
            userSignUpStateStatus === "idle" ||
            userSignUpStateStatus === "succeeded" ||
            userSignUpStateStatus === "rejected"
        ) {
            console.log("requested state update");
            console.log(userSignUpStateStatus);
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    };

    useEffect(() => {
        if (
            auth.user &&
            !auth.isAuthenticating &&
            userSignUpStateStatus === "idle"
        ) {
            requestUpdateState();
        }
    }, [dispatch, auth.user, auth.isAuthenticating, userSignUpStateStatus]);

    const navigate = useNavigate();
    const contentRefs = useRef([]);

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

    const userStatePageIndexMap = {
        ACCOUNT_CREATED: 0,

        // Keep user in complete account flow for retry state
        ACCREDATION_VERIF_COMPLETE: 1,
        DWOLLA_ACCOUNT_RETRY_REQ: 1,
        DWOLLA_ACCOUNT_KBA_REQ: 2,
        DWOLLA_ACCOUNT_DOCUMENT_REQ: 3,
        DWOLLA_ACCOUNT_VERIFIED: 4,
    };

    const pageIndex = userStatePageIndexMap[userSignUpState];

    const pageContent = [
        {
            title: "Accreditation",
            content: (
                <AccreditationStatus
                    onComplete={onComplete}
                ></AccreditationStatus>
            ),
            disabled:
                userSignUpOrder(userSignUpState) < signUpOrder.ACCOUNT_CREATED,
        },
        {
            title: "Personal Information",
            content: (
                <CreateDwollaAccount
                    onComplete={onComplete}
                ></CreateDwollaAccount>
            ),
            disabled:
                userSignUpOrder(userSignUpState) <
                signUpOrder.ACCREDATION_VERIF_COMPLETE,
        },
        {
            title: "KBA Validation",
            content: (
                <IdentityVerificationKBA
                    onComplete={onComplete}
                ></IdentityVerificationKBA>
            ),
            disabled: userSignUpState !== "DWOLLA_ACCOUNT_KBA_REQ",
            sidebar: false,
        },
        {
            title: "Document Validation",
            content: (
                <IdentityVerificationDocument
                    onComplete={onComplete}
                ></IdentityVerificationDocument>
            ),
            disabled: userSignUpState !== "DWOLLA_ACCOUNT_DOCUMENT_REQ",
            sidebar: false,
        },
        {
            title: "Create Wallet",
            content: (
                <Stack spacing={6}>
                    <Typography variant="body2">
                        On Legends, earnings are deposited into your ‘Legends
                        Wallet’, where you can save them, reinvest them in
                        future offerings or deposit them in your checking
                        account. The Legends Wallet will never withdraw funds
                        from your checking account.
                    </Typography>

                    <Button
                        variant="primary"
                        disabled={userSignUpState !== "DWOLLA_ACCOUNT_VERIFIED"}
                        onClick={() => {
                            navigate("/explore");
                        }}
                    >
                        Continue
                    </Button>
                </Stack>
            ),
            disabled: userSignUpOrder(userSignUpState) < 5,
            sidebar: true,
        },
    ];

    return (
        <LinearPageinatedView
            header={
                <Typography variant="smallHeadline">
                    Profile Information
                </Typography>
            }
            pageContent={pageContent}
            pageIndex={pageIndex}
        ></LinearPageinatedView>
    );
};

export default CompleteAccountPage;
