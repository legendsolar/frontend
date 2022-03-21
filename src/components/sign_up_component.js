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
import GoogleSignUp from "../components/buttons/google_icon_button";
import LoadingView from "../views/loading_view";
import CenteredComponentView from "../views/centered_component_view";
import GoogleIconButton from "../components/buttons/google_icon_button";
import ContentDivider from "../components/basics/content_divider";
import { authErrorTranslator } from "../utils/auth_error_translator";

const SignUpComponent = ({ onComplete }) => {
    const authHook = useAuth();

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
        onComplete();
    };

    const handleFirebaseError = (error) => {
        const translatedError = authErrorTranslator(error);

        const newFormValues = { ...formValues };
        newFormValues[translatedError.type].error = true;
        newFormValues[translatedError.type].errMsg = translatedError.message;

        setFormValues(newFormValues);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        authHook
            .signup(formValues.email.value, formValues.password.value)
            .then(() => {
                onSuccessfulSignUp();
            })
            .catch((error) => {
                handleFirebaseError(error);
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
        <Box>
            <Stack spacing={4}>
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
                    color="legendaryGreen"
                    sx={{ width: "100%" }}
                >
                    Continue
                </Button>
            </Stack>
        </Box>
    );
};

export default SignUpComponent;
