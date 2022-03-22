import { Stack, Typography } from "@mui/material";
import ScrollBottomToComplete from "./scroll_bottom_complete";
import PrivacyPolicy from "../assets/legal/privacy.js";
import TermsAndConditions from "../assets/legal/termsAndConditions.js";

const PolicyAcceptanceComponent = ({ onComplete }) => {
    return (
        <Stack spacing={6}>
            <Typography variant="smallHeadline">Privacy Notice</Typography>
            <ScrollBottomToComplete>
                <div dangerouslySetInnerHTML={{ __html: PrivacyPolicy }}></div>
            </ScrollBottomToComplete>

            <Typography variant="smallHeadline">
                Terms and Conditions
            </Typography>
            <ScrollBottomToComplete>
                <div
                    dangerouslySetInnerHTML={{ __html: TermsAndConditions }}
                ></div>
            </ScrollBottomToComplete>
        </Stack>
    );
};

export default PolicyAcceptanceComponent;
