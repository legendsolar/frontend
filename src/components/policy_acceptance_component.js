import { Stack, Typography } from "@mui/material";
import ScrollBottomToComplete from "./scroll_bottom_complete";
import PrivacyPolicy from "../assets/legal/privacy.js";
import TermsAndConditions from "../assets/legal/termsAndConditions.js";
import { ref } from "firebase/database";
import { useCloudFunctions } from "../hooks/use_cloud_functions";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use_auth";
import { useDatabase } from "reactfire";
import { useDatabaseObjectData } from "reactfire";

const PolicyAcceptanceComponent = ({ onComplete }) => {
    const cloudFunctions = useCloudFunctions();
    const auth = useAuth();
    const user = auth.user;

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    const [loading, setLoading] = useState(false);

    const initialState = {
        privacy: false,
        privacyVersion: null,
        termsAndConditions: false,
        termsAndConditionsVersion: null,
    };

    const [policyAcceptance, setPolicyAcceptance] = useState(initialState);

    useEffect(() => {
        if (status == "success") {
            if (
                userInfo &&
                userInfo.acceptance &&
                userInfo?.acceptance?.privacy &&
                userInfo?.acceptance?.termsAndConditions
            ) {
                setPolicyAcceptance({
                    privacy: !!userInfo.acceptance.privacy.accepted,
                    privacyVersion: null,
                    termsAndConditions:
                        !!userInfo.acceptance.termsAndConditions.accepted,
                    termsAndConditionsVersion: null,
                });
            }
        }

        console.log(userInfo);
    }, [status]);

    const onCompleteItem = (event, item) => {
        const newPolicyAcceptance = { ...policyAcceptance };
        newPolicyAcceptance[item] = true;

        setPolicyAcceptance(newPolicyAcceptance);

        if (
            newPolicyAcceptance.privacy &&
            newPolicyAcceptance.termsAndConditions
        ) {
            cloudFunctions
                .updateUserAcceptanceState({
                    privacy: {
                        accepted: newPolicyAcceptance.privacy,
                        version: null,
                    },
                    termsAndConditions: {
                        accepted: newPolicyAcceptance.termsAndConditions,
                        version: null,
                    },
                })
                .then(() => {
                    onComplete();
                });
        }
    };

    return (
        <Stack spacing={6}>
            <Typography variant="smallHeadline">Privacy Notice</Typography>
            <ScrollBottomToComplete
                onComplete={(event) => {
                    onCompleteItem(event, "privacy");
                }}
                completed={policyAcceptance.privacy}
            >
                <div dangerouslySetInnerHTML={{ __html: PrivacyPolicy }}></div>
            </ScrollBottomToComplete>

            <Typography variant="smallHeadline">
                Terms and Conditions
            </Typography>
            <ScrollBottomToComplete
                onComplete={(event) => {
                    onCompleteItem(event, "termsAndConditions");
                }}
                completed={policyAcceptance.termsAndConditions}
            >
                <div
                    dangerouslySetInnerHTML={{ __html: TermsAndConditions }}
                ></div>
            </ScrollBottomToComplete>
        </Stack>
    );
};

export default PolicyAcceptanceComponent;
