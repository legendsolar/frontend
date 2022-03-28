import { useState } from "react";

import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useAuth } from "../hooks/use_auth";
import { useNavigate, useLocation } from "react-router-dom";
import CenteredComponentView from "../views/centered_component_view";
import IconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";
import { authErrorTranslator } from "../utils/auth_error_translator";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogo from "../components/icons/google_logo";

function SignInView() {
    const authHook = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const onSuccessfulSignIn = () => {
        navigate(state?.path || "/");
    };

    const initValues = {
        email: {
            value: "",
            error: false,
            errMsg: "",
        },
        password: {
            value: "",
            error: false,
            errMsg: "",
        },
    };

    const [formValues, setFormValues] = useState(initValues);

    const formDataValid = (formData) => {
        if (!formData.password.value) {
            formData.password.error = true;
            formData.password.errMsg = "Password required";
        } else {
            formData.password.error = false;
            formData.password.errMsg = "";
        }

        if (!formData.email.value) {
            formData.email.error = true;
            formData.email.errMsg = "Email required";
        } else {
            formData.email.error = false;
            formData.email.errMsg = "";
        }

        setFormValues(formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedObject = { ...formValues };
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    const onSuccessfulSignUp = () => {
        navigate("/complete-account/create");
    };

    const handleFirebaseError = (error) => {
        const translatedError = authErrorTranslator(error);

        const newFormValues = { ...formValues };
        newFormValues[translatedError.type].error = true;
        newFormValues[translatedError.type].errMsg = translatedError.message;

        setFormValues(newFormValues);
    };

    const handleSubmit = (event) => {
        console.log("submit");
        event.preventDefault();

        authHook
            .signin(formValues.email.value, formValues.password.value)
            .then(() => {
                onSuccessfulSignUp();
            })
            .catch((error) => {
                handleFirebaseError(error);
                console.log("error");
                console.log(error);
                console.log(error.message);
                console.log(error.code);
            });
    };

    const isDisabled = () => {
        const error = Object.keys(formValues)
            .map((key) => {
                return formValues[key].error !== false;
            })
            .some((el) => el);
        console.log(error);

        return error;
    };

    return (
        <CenteredComponentView>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Login</Typography>
                    <IconButton
                        label="Sign in with Google"
                        color="whiteHaze"
                        icon={<GoogleLogo height={"64px"}></GoogleLogo>}
                        onClick={() => {
                            authHook
                                .signInWithGoogle()
                                .then(() => {
                                    onSuccessfulSignUp();
                                })
                                .catch((error) => {
                                    handleFirebaseError(error);
                                });
                        }}
                    ></IconButton>

                    <ContentDivider>
                        <Typography align="center" variant="smallLabel">
                            or
                        </Typography>
                    </ContentDivider>

                    <TextField
                        error={!!formValues.email.error}
                        helperText={formValues.email.errMsg}
                        margin="normal"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={!!formValues.password.error}
                        helperText={formValues.password.errMsg}
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                    />

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isDisabled()}
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
