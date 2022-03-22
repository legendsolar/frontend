import { Stack, Typography } from "@mui/material";
import ScrollBottomToComplete from "./scroll_bottom_complete";

const PolicyAcceptanceComponent = ({ onComplete }) => {
    return (
        <Stack spacing={6}>
            <Typography variant="smallHeadline">Privacy Notice</Typography>
            <ScrollBottomToComplete></ScrollBottomToComplete>

            <Typography variant="smallHeadline">
                Terms and Conditions
            </Typography>
            <ScrollBottomToComplete></ScrollBottomToComplete>
        </Stack>
    );
};

export default PolicyAcceptanceComponent;
