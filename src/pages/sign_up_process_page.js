import { useState } from "react";

import {
    Typography,
    Box,
    Grid,
    Stack,
    Link,
    TextField,
    CssBaseline,
    Button,
    Paper,
    Collapse,
    Alert,
    AlertTitle,
    IconButton,
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

        const email = data.get("email");
        const password = data.get("password");

        if (email && password) {
            auth.signup(data.get("email"), data.get("password"))
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(error.message);
                    setErrorOpen(true);
                });
        } else {
            setErrorMessage("Email and password need to be filled");
            setErrorOpen(true);
        }
    };

    return (
        <FullPageComponentView>
            <Paper sx={{ width: "800px" }} variant="container">
                <CssBaseline />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Typography variant="subtitle1">Sign up</Typography>
                    <Stack>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                        <Button
                            type="submit"
                            color="legendaryGreen"
                            sx={{ width: "100%" }}
                        >
                            Sign Up
                        </Button>

                        <Link href="/signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Stack>
                </Box>
            </Paper>
        </FullPageComponentView>
    );
}
