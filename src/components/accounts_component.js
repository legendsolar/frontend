import { Typography, Paper, Stack, Button } from "@mui/material";
import PlaidLink from "./plaid_link";
function AccountsComponent(props) {
    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">Linked Accounts</Typography>
            <Typography variant="description">
                No accounts currently linked
            </Typography>

            <Typography variant="body2">Link New Account:</Typography>
            <PlaidLink></PlaidLink>
        </Stack>
    );
}

export default AccountsComponent;
