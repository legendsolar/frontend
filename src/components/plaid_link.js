import { Paper, Stack, Button, Typography } from "@mui/material";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "./../hooks/use_auth";

import { useEffect, useState } from "react";
import {
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
} from "../firebase/cloud_functions";

const PlaidLink = (props) => {
    const auth = useAuth();
    const [token, setToken] = useState(null);
    const redirectUri = "https://legends.solar";

    useEffect(() => {
        createPlaidLinkToken({
            userId: auth.user.uid,
            redirectUri: redirectUri,
        }).then((data) => {
            console.log("public token obtained");
            console.log(data);
            console.log(data.data.tokenData.link_token);
            setToken(data.data.tokenData.link_token);
        });
    }, []);

    const { open, ready } = usePlaidLink({
        token: token,
        onSuccess: (public_token, metadata) => {
            // send public_token to server

            console.log("public token obtained");
            console.log(public_token);

            const accessToken = exchangePublicTokenForAccessToken({
                publicToken: public_token,
            });
        },
    });
    return (
        <Paper variant="container">
            <Typography>plaid credentials: user_good, pass_good</Typography>
            <Button
                onClick={() => {
                    open();
                }}
                disabled={!ready}
            >
                Test Plaid Link
            </Button>
        </Paper>
    );
};

export default PlaidLink;
