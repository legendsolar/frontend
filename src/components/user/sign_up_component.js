import { useState } from "react";
import { Grid, Box, Stack, TextField, Button } from "@mui/material";
import { useAuth } from "../../hooks/use_auth";
import { authErrorTranslator } from "../../utils/auth_error_translator";
import {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateLastName,
    validateFirstName,
} from "../../validation/user_data_validation";

const SignUpComponent = ({ onComplete }) => {
    const authHook = useAuth();

    const initValues = {
        email: {
            value: "",
        },
        password: {
            value: "",
        },

        firstName: {
            value: "",
        },
        lastName: {
            value: "",
        },
        phoneNumber: {
            value: "",
        },
    };

    const [formValues, setFormValues] = useState(initValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedObject = { ...formValues };

        switch (name) {
            case "firstName":
                updatedObject[name] = {
                    ...validateFirstName(value),
                };
                break;

            case "lastName":
                updatedObject[name] = {
                    ...validateLastName(value),
                };
                break;

            case "phoneNumber":
                updatedObject[name] = {
                    ...validatePhoneNumber(value),
                };
                break;

            case "email":
                updatedObject[name] = {
                    ...validateEmail(value),
                };
                break;

            case "password":
                updatedObject[name] = {
                    ...validatePassword(value),
                };
                break;
        }

        updatedObject[name].value = value;

        setFormValues(updatedObject);
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
        return error;
    };

    return (
        <Box>
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={!!formValues.firstName.error}
                            helperText={formValues.firstName.errMsg}
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={!!formValues.lastName.error}
                            helperText={formValues.lastName.errMsg}
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={!!formValues.email.error}
                            helperText={formValues.email.errMsg}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <TextField
                            error={!!formValues.phoneNumber.error}
                            helperText={formValues.phoneNumber.errMsg}
                            id="phoneNumber"
                            label="Phone number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <TextField
                            error={!!formValues.password.error}
                            helperText={formValues.password.errMsg}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </div>

            <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isDisabled()}
                color="legendaryGreen"
                sx={{ width: "100%", mt: 4 }}
            >
                Continue
            </Button>
        </Box>
    );
};

export default SignUpComponent;
