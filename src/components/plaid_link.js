import { Paper, Stack, Button, Typography } from "@mui/material";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "./../hooks/use_auth";

import { useEffect, useState } from "react";
import {
    createPlaidLinkToken,
    exchangePublicTokenForAccessToken,
    useCloudFunctions,
} from "../hooks/use_cloud_functions";

const PlaidLink = ({ onSuccess }) => {
    const auth = useAuth();
    const cloudFunctions = useCloudFunctions();
    const createPlaidLinkToken = cloudFunctions.createPlaidLinkToken;
    const exchangePublicTokenForAccessToken =
        cloudFunctions.exchangePublicTokenForAccessToken;

    const [token, setToken] = useState("");
    const [publicToken, setPublicToken] = useState("-");
    const [accessToken, setAccessToken] = useState("-");
    const [processorToken, setProcessorToken] = useState("-");
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
            console.log(metadata);
            setPublicToken(public_token);

            const accountName = `${metadata.institution.name}|${metadata.accounts[0].subtype}|${metadata.accounts[0].name}`;
            // |${metadata.accounts[0].mask}`;

            exchangePublicTokenForAccessToken({
                publicToken: public_token,
                accountId: metadata.account_id,
                name: accountName,
                metadata: metadata,
            }).then(({ data }) => {
                console.log("access token obtained");
                console.log(data);
                console.log(data.accessToken);

                setAccessToken(data.accessToken);

                console.log("processor token obtained");
                console.log(data.processorToken);

                setProcessorToken(data.processorToken);
                onSuccess();
            });
        },
    });
    return (
        <Stack>
            <Button
                onClick={() => {
                    open();
                }}
                disabled={!ready}
                variant="primary"
            >
                Link with Plaid
            </Button>
            <Typography variant="description">{"[DEBUG]\n"}</Typography>

            <Typography variant="description">
                {"link token: " + token}
            </Typography>

            <Typography variant="description">
                {"public token: " + publicToken}
            </Typography>

            <Typography variant="description">
                {"access token: " + accessToken}
            </Typography>

            <Typography variant="description">
                {"dwolla processor token: " + processorToken}
            </Typography>

            <Typography variant="description">
                [Debug] Bank Credentials are: user_good, pass_good for any bank
            </Typography>
        </Stack>
    );
};

export default PlaidLink;
