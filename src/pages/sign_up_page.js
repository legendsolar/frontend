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
import GoogleSignUp from "../components/buttons/google_icon_button";
import LoadingView from "../views/loading_view";
import CenteredComponentView from "../views/centered_component_view";
import GoogleIconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";

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
        <CenteredComponentView>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Create Account</Typography>
                    <GoogleIconButton
                        label={"Sign up with Google"}
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
                        Create Account
                    </Button>

                    <Stack direction="row" justifyContent={"flex-end"}>
                        <Stack spacing={2} alignItems={"flex-end"}>
                            <Typography variant="smallLabel">
                                Already have an account
                            </Typography>
                            <Button
                                variant="medium"
                                onClick={() => {
                                    navigate("/signIn");
                                }}
                                sx={{ width: "120px" }}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </CenteredComponentView>
    );
}
