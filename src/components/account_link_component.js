import { Stack, Button, Box, Typography } from "@mui/material";
import CheckboxList from "./inputs/checkbox_list";
import { useState } from "react";
import PlaidLink from "./plaid_link";
const AccountLinkComponent = ({ onContinue, onComplete }) => {
    const [continueAllowed, setContinueAllowed] = useState(false);

    const onPlaidSuccess = () => {
        setContinueAllowed(true);
        onComplete();
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Link Financial Account
            </Typography>

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
        </Stack>
    );
};

export default AccountLinkComponent;
