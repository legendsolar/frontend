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
import UserInfo from "../components/user_info";
import AccountLinkComponent from "../components/account_link_component";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import LoadingView from "../views/loading_view";
import IdentityVerification from "../components/identity_verification";

import { getKBASession } from "../firebase/cloud_functions";
import ImageUpload from "../components/image_upload";
import DefaultComponent from "../components/default_component";

import { useSelector, useDispatch } from "react-redux";
import {
    fetchUserSignUpState,
    selectUserSignUpState,
} from "../slices/user_slice";

export default function VerificationPage() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const user = auth.user;

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status
    );
    const userSignUpState = useSelector(selectUserSignUpState);

    useEffect(() => {
        if (userSignUpStateStatus === "idle") {
            dispatch(fetchUserSignUpState());
        }
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

    const [kbaQuestions, setKBAQuestions] = useState([]);

    // useEffect(() => {
    //     getKBASession().then(({ data }) => {
    //         setKBAQuestions(data.questions);
    //     });
    // }, []);

    const onSubmitKBA = (selections) => {
        console.log("submitted kba");
        console.log(selections);

        returnKBASessionResponse(selections);
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
                    <DefaultComponent>
                        <AccreditationStatus
                            onContinue={() => {
                                // TODO scroll to next action
                            }}
                        ></AccreditationStatus>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={
                            userSignUpState !== "ACCREDATION_VERIF_COMPLETE"
                        }
                    >
                        <UserInfo
                            onContinue={() => {
                                // TODO scroll to next action
                            }}
                        ></UserInfo>
                    </DefaultComponent>

                    <DefaultComponent disabled={true}>
                        <Stack spacing={2}>
                            <IdentityVerification
                                questions={kbaQuestions}
                                idVerification={true}
                                onSubmit={onSubmitKBA}
                            ></IdentityVerification>

                            <Typography variant="headline3">
                                {`Document Verification`}
                            </Typography>

                            <Typography variant="description">
                                {`A scan of a passport, driver's license or government 
                                issued ID is required to verify your identity.`}
                            </Typography>

                            <Typography variant="description">
                                {`\nAll four edges of the document should be visible, and the image should be 
                            directly above the document.`}
                            </Typography>

                            <ImageUpload></ImageUpload>
                        </Stack>
                    </DefaultComponent>

                    <DefaultComponent
                        disabled={userSignUpState !== "DWOLLA_ACCOUNT_VERIFIED"}
                    >
                        <AccountLinkComponent
                            onContinue={() => {
                                navigate("/explore");
                            }}
                        ></AccountLinkComponent>
                    </DefaultComponent>
                </Stack>
            }
        ></SideBarNavView>
    );
}
