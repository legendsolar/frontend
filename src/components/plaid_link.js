import { Paper, Stack, Button, Typography } from "@mui/material";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "./../hooks/use_auth";

import { useEffect, useState } from "react";
import {
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
} from "../firebase/cloud_functions";

const PlaidLink = ({ onSuccess }) => {
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

                onSuccess();
            });
        },
    });
    return (
        <Stack>
            <Typography variant="description">
                [Debug] Bank Credentials are: user_good, pass_good for any bank
            </Typography>
            <Button
                onClick={() => {
                    open();
                }}
                disabled={!ready}
                variant="primary"
            >
                Link with Plaid
            </Button>
            <Typography variant="description">
                {"[DEBUG]\n"}
                {"link token: " + token}
                {"public token: " + publicToken}
                {"access token: " + accessToken}
            </Typography>
        </Stack>
    );
};

export default PlaidLink;
