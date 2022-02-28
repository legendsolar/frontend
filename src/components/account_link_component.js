import { Stack, Button, Box, Typography } from "@mui/material";
import CheckboxList from "./inputs/checkbox_list";
import { useState } from "react";
import PlaidLink from "./plaid_link";
const AccountLinkComponent = ({ onContinue }) => {
    const [continueAllowed, setContinueAllowed] = useState(false);

    const onPlaidSuccess = () => {
        setContinueAllowed(true);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">Link Institution</Typography>

            <Typography variant="description">
                We need to link an account to transfer money from your Wallet to{" "}
            </Typography>

            <PlaidLink onSuccess={onPlaidSuccess}></PlaidLink>

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
