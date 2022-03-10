import { useState } from "react";

import {
    Link,
    Grid,
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Stack,
    Collapse,
    Alert,
    AlertTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/use_auth";
import { useNavigate, useLocation } from "react-router-dom";
import CenteredComponentView from "../views/centered_component_view";
import GoogleIconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";

function SignInView() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSuccessfulSignIn = () => {
        navigate(state?.path || "/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        if (email && password) {
            auth.signin(email, password)
                .then(() => {
                    onSuccessfulSignIn();
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(error.message);
                    setErrorOpen(true);
                });
        } else {
            setErrorMessage("Email and/or password invalid");
            setErrorOpen(true);
        }
    };

    return (
        <CenteredComponentView>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Login</Typography>
                    <GoogleIconButton
                        label="Sign in with Google"
                        onClick={() => {
                            auth.signInWithGoogle()
                                .then(() => {
                                    onSuccessfulSignIn();
                                })
                                .catch((error) => {
                                    setErrorMessage(error.message);
                                    setErrorOpen(true);
                                });
                        }}
                    ></GoogleIconButton>

                    <ContentDivider>
                        <Typography align="center" variant="smallLabel">
                            or
                        </Typography>
                    </ContentDivider>

                    <TextField
                        margin="normal"
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
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
                        Login
                    </Button>

                    <Stack direction="row" justifyContent={"flex-end"}>
                        <Stack spacing={2} alignItems={"flex-end"}>
                            <Typography variant="smallLabel">
                                Don't have an account
                            </Typography>
                            <Button
                                variant="medium"
                                onClick={() => {
                                    navigate("/signUp");
                                }}
                                sx={{ width: "120px" }}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </CenteredComponentView>
    );
}

export default SignInView;
