import { Stack, Button, Box, Typography } from "@mui/material";
import CheckboxList from "./inputs/checkbox_list";
import { useState } from "react";
const AccountLinkComponent = ({ onContinue }) => {
    const [continueAllowed, setContinueAllowed] = useState(false);

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Link Financial Institution
            </Typography>

            <Typography variant="description">
                We need to link an account under your name to send money from
                your Wallet to an account
            </Typography>

            <Button
                variant="primary"
                disabled={!continueAllowed}
                onClick={() => onContinue()}
            >
                Continue
            </Button>
            <Typography align={"center"} variant="smallLabel">
                OR
            </Typography>
            <Button variant="secondary" onClick={() => onContinue()}>
                Skip for now
            </Button>
        </Stack>
    );
};

export default AccountLinkComponent;
