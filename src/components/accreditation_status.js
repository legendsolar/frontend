import { Stack, Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckboxList from "./inputs/checkbox_list";

const AccreditationStatus = ({ onContinue }) => {
    const [verifyInvestorState, setVerifyInvestorState] = useState("idle");

    useEffect(() => {
        const verifyInvestorScript = document.createElement("script");
        verifyInvestorScript.src =
            "https://verifyinvestor-staging.herokuapp.com/verify-investor-embedded-api.min.js";
        verifyInvestorScript.async = true;
        verifyInvestorScript.onload = () => {
            setVerifyInvestorState("script_loaded");
        };

        document.body.appendChild(verifyInvestorScript);
    }, []);

    const openVerifyInvestorView = () => {
        if (verifyInvestorState === "script_loaded") {
            const token = "test_only_GETJBU3mPvIeysBzZFOWJQ";
            // const identifier = YOUR_IDENTIFIER; // optional
            // const portal_name = YOUR_PORTAL_NAME; // optional
            // const deal_name = YOUR_DEAL_NAME; // optional
            window.verifyInvestor(token);

            // Has to be this element, because it's the one with position equal to fixed
            // ensure that any mui with zIndex > 0 is occluded
            document.getElementsByClassName("verify-investor-modal").style[
                "z-index"
            ] = 100;
        }
    };

    return (
        <Stack spacing={2}>
            <Typography variant="smallHeadline">
                Accreditation Status
            </Typography>

            <Typography variant="description">
                We're required to verify your accreditation status. We've
                partnered with VerifyInvestor to ensure this process is as
                seemless as possible.
            </Typography>

            <Button
                variant="primary"
                disabled={verifyInvestorState !== "script_loaded"}
                onClick={() => openVerifyInvestorView()}
            >
                Verify Accreditation Status
            </Button>

            <Button
                variant="primary"
                disabled={true}
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

export default AccreditationStatus;
