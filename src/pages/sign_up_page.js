import { useState } from "react";

import { Typography, Box, Stack, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import CenteredComponentView from "../views/centered_component_view";
import IconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";
import { authErrorTranslator } from "../utils/auth_error_translator";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogo from "../components/icons/google_logo";

export default function SignUpView() {
    const authHook = useAuth();
    const navigate = useNavigate();

    const initValues = {
        email: {
            value: "",
        },
        password: {
            value: "",
        },
    };

    const [formValues, setFormValues] = useState(initValues);

    const formDataValid = (formData) => {
        if (!formData.password.value) {
            formData.password.error = true;
            formData.password.errMsg = "Password required";
        } else {
            formData.password.error = false;
            formData.password.errMsg = undefined;
        }

        if (!formData.email.value) {
            formData.email.error = true;
            formData.email.errMsg = "Email required";
        } else {
            formData.email.error = false;
            formData.email.errMsg = undefined;
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
            .signup(formValues.email.value, formValues.password.value)
            .then(() => {
                onSuccessfulSignUp();
            })
            .catch((error) => {
                const translatedError = authErrorTranslator(error);

                const newFormValues = { ...formValues };
                newFormValues[translatedError.type].error = true;
                newFormValues[translatedError.type].errMsg =
                    translatedError.message;

                setFormValues(newFormValues);

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
            <Box>
                <Stack spacing={4}>
                    <Typography variant="subtitle1">Create Account</Typography>
                    <IconButton
                        label="Sign up with Google"
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

                    <IconButton
                        label="Sign up with email"
                        color="legendaryGreen"
                        icon={
                            <EmailIcon
                                sx={{ ml: 3, fontSize: "18px" }}
                            ></EmailIcon>
                        }
                        onClick={() => {
                            navigate("/complete-account/create");
                        }}
                    ></IconButton>

                    <Stack direction="row" justifyContent={"flex-end"}>
                        <Button
                            variant="text"
                            onClick={() => navigate("/signin")}
                        >
                            <Typography variant="smallLabel">
                                {"Have an account? "}
                            </Typography>
                            <Typography
                                variant="smallLabel"
                                color="grassGreen.main"
                                sx={{ ml: 1 }}
                            >
                                {" Login"}
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </CenteredComponentView>
    );
}
