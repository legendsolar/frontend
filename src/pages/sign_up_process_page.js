import { useEffect, useState } from "react";
import {
    createDwollaAccount,
    getWalletBalance,
} from "../firebase/cloud_functions";
import {
    Typography,
    Box,
    Stack,
    TextField,
    CssBaseline,
    Button,
    Paper,
    Collapse,
    Alert,
    IconButton,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import FullPageComponentView from "../views/full_page_component_view";

export default function VerificationPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        createDwollaAccount({
            user: {
                firstName: data.get("firstName"),
                lastName: data.get("lastName"),
                email: auth.user.email,
                address1: data.get("address1"),
                city: data.get("city"),
                stateAbbr: data.get("state"),
                postalCode: data.get("postalCode"),
                dateOfBirth: data.get("dateOfBirth"),
                lastFourSSN: data.get("lastFourSSN"),
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        getWalletBalance({
            walletId: "4fa96f97-f95d-4181-9b9d-17a7ebdd585c",
        }).then((resp) => {
            console.log("wallet resp");
            console.log(resp);
            setWalletBalance(resp.data.balance);
        });
    }, []);

    const steps = [
        "Personal Information",
        "Connect Institution",
        "Confirmation",
    ];

    return (
        <FullPageComponentView>
            <Stack spacing={2}>
                <Paper sx={{ width: "600px" }} variant="container">
                    <CssBaseline />

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <Typography variant="subtitle1">
                            Verify Your Account
                        </Typography>
                        <Stack>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="lastName"
                                label="Last Name"
                                id="lastName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address1"
                                label="Address"
                                id="address1"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="city"
                                label="City"
                                id="city"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="state"
                                label="State"
                                id="state"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="postalCode"
                                label="Zip Code"
                                id="postalCode"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="dateOfBirth"
                                label="Date of Birth"
                                id="dateOfBirth"
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="lastFourSSN"
                                label="Last Four Digits of SSN"
                                id="lastFourSSN"
                            />

                            <Collapse in={errorOpen}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setErrorOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {errorMessage}
                                </Alert>
                            </Collapse>
                            <Button type="submit" color="legendaryGreen">
                                [Debug Only] Create Dwolla Account
                            </Button>

                            <Stepper activeStep={0} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Stack>
                    </Box>
                </Paper>

                <Paper sx={{ width: "600px" }} variant="container">
                    <Typography>Live Wallet Amount:</Typography>
                    {walletBalance}
                </Paper>
            </Stack>
        </FullPageComponentView>
    );
}
