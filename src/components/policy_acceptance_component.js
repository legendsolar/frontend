import { Stack, Typography } from "@mui/material";
import ScrollBottomToComplete from "./scroll_bottom_complete";
import PrivacyPolicy from "../assets/legal/privacy.js";
import TermsAndConditions from "../assets/legal/termsAndConditions.js";
import { useState } from "react";

const PolicyAcceptanceComponent = ({ onComplete }) => {
    const initialState = {
        privacy: false,
        privacyVersion: null,
        termsAndConditions: false,
        termsAndConditionsVersion: null,
    };

    const [policyAcceptance, setPolicyAcceptance] = useState(initialState);

    const onCompleteItem = (event, item) => {
        const newPolicyAcceptance = { ...policyAcceptance };
        newPolicyAcceptance[item] = true;

        setPolicyAcceptance(newPolicyAcceptance);

        if (
            newPolicyAcceptance.privacy &&
            newPolicyAcceptance.termsAndConditions
        ) {
            onComplete();
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
