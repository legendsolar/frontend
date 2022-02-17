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
    const [token, setToken] = useState("");
    const [publicToken, setPublicToken] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const redirectUri = "https://legends.solar";

    useEffect(() => {
        createPlaidLinkToken({
            userId: auth.user.uid,
            redirectUri: redirectUri,
        }).then((data) => {
            console.log("link token obtained");
            setToken(data.data.tokenData.link_token);
        });
    }, []);

    const { open, ready } = usePlaidLink({
        token: token,
        onSuccess: (public_token, metadata) => {
            // send public_token to server

            console.log("public token obtained");
            console.log(public_token);
            setPublicToken(public_token);

            exchangePublicTokenForAccessToken({
                publicToken: public_token,
            }).then((data) => {
                console.log("access token obtained");
                console.log(data.accessToken);
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
            <Typography>{"link token: " + token}</Typography>
            <Typography>{"public token: " + publicToken}</Typography>
            <Typography>{"access token: " + accessToken}</Typography>
        </Paper>
    );
};

export default PlaidLink;
