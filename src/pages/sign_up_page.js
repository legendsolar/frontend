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
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignUpView() {
    const authHook = useAuth();
    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential =
        //             GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The AuthCredential type that was used.
        //         const credential =
        //             GoogleAuthProvider.credentialFromError(error);
        //         // ...
        //         console.error(errorMessage);
        //     });
    };

    const navigate = useNavigate();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get("email");
        const password = data.get("password");

        if (email && password) {
            authHook
                .signup(data.get("email"), data.get("password"))
                .then(() => {
                    navigate("/complete-account");
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
            <Paper sx={{ width: "500px" }} variant="container">
                <CssBaseline />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Typography variant="subtitle1">Sign up</Typography>
                    <Stack>
                        <Button onClick={() => googleSignIn()}>
                            Sign up with Google
                        </Button>
                        <Typography align="center">or</Typography>
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
