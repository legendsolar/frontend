import { Typography, Stack } from "@mui/material";
import MultiSelectQuestion from "./multiselect_question";

const IdentityVerification = () => {
    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Identity Verification
            </Typography>
            <Typography variant="description">
                We need to ask a few questions to verify your identity
            </Typography>
            <MultiSelectQuestion></MultiSelectQuestion>
            <MultiSelectQuestion></MultiSelectQuestion>
            <MultiSelectQuestion></MultiSelectQuestion>
            <MultiSelectQuestion></MultiSelectQuestion>
        </Stack>
    );
};
export default IdentityVerification;
