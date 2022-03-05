import { Alert, Box, Stack, Paper, Grid } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import { attemptCreateNewDwollaVerifiedUser } from "../firebase/cloud_functions";

function UserInfo(props) {
    const auth = useAuth();
    const user = auth.user;

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    const startingValues = {
        firstName: {
            value: "",
        },
        lastName: {
            value: "",
        },
        streetAddress: {
            value: "",
        },
        streetAddress2: {
            value: "",
        },
        city: {
            value: "",
        },
        state: {
            value: "",
        },
        phoneNumber: {
            value: "",
        },
        postalCode: {
            value: "",
        },
        ssn: {
            value: "",
        },
    };

    const [formValues, setFormValues] = useState(startingValues);
    const [submitErrorMessage, setSubmitErrorMessage] = useState(undefined);

    if (status == "success") {
        if (
            userInfo &&
            userInfo.info &&
            userInfo.info.address &&
            userInfo.info.name
        ) {
            const info = userInfo.info;
            const loadedUserData = { ...formValues };

            loadedUserData.firstName.value = info.name.first;
            loadedUserData.lastName.value = info.name.last;
            loadedUserData.streetAddress.value = info.address.streetNumber;
            loadedUserData.city.value = info.address.city;
            loadedUserData.state.value = info.address.state;

            formDataValid(loadedUserData);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedObject = { ...formValues };
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    const formDataValid = (formData) => {
        if (!formData.firstName.value) {
            formData.firstName.error = true;
            formData.firstName.errMsg = "First name required";
        } else {
            formData.firstName.error = false;
            formData.firstName.errMsg = undefined;
        }

        if (!formData.lastName.value) {
            formData.lastName.error = true;
            formData.lastName.errMsg = "Last name required";
        } else {
            formData.lastName.error = false;
            formData.lastName.errMsg = undefined;
        }

        if (!formData.phoneNumber.value) {
            formData.phoneNumber.error = true;
            formData.phoneNumber.errMsg = "Phone number required";
        } else {
            formData.phoneNumber.error = false;
            formData.phoneNumber.errMsg = undefined;
        }

        if (!formData.streetAddress.value) {
            formData.firstName.error = true;
            formData.firstName.errMsg = "Street required";
        } else {
            formData.streetAddress.error = false;
            formData.streetAddress.errMsg = undefined;
        }

        if (!formData.city.value) {
            formData.city.error = true;
            formData.city.errMsg = "City required";
        } else {
            formData.city.error = false;
            formData.city.errMsg = undefined;
        }

        if (!formData.state.value) {
            formData.state.error = true;
            formData.state.errMsg = "State required";
        } else {
            formData.state.error = false;
            formData.state.errMsg = undefined;
        }

        if (!formData.postalCode.value) {
            formData.postalCode.error = true;
            formData.postalCode.errMsg = "Zip code required";
        } else if (!formData.postalCode.value.match(/\d{5}/g)) {
            formData.postalCode.error = true;
            formData.postalCode.errMsg = "Zip code invalid";
        } else {
            formData.postalCode.error = false;
            formData.postalCode.errMsg = undefined;
        }

        if (!formData.ssn.value || !formData.ssn.value.match(/\d{4}/g)) {
            formData.ssn.error = true;
            formData.ssn.errMsg = "SSN format invalid";
        } else {
            formData.ssn.error = false;
            formData.ssn.errMsg = undefined;
        }

        setFormValues(formData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const dwollaObject = {
            name: {
                first: formValues.firstName.value,
                last: formValues.lastName.value,
            },
            address: {
                streetAddress: formValues.streetAddress.value,
                streetAddress2: formValues.streetAddress2.value,
                city: formValues.city.value,
                state: formValues.state.value,
                postalCode: formValues.postalCode.value,
            },
            dateOfBirth: "10/11/1995",
            ssn: formValues.ssn.value,
        };

        attemptCreateNewDwollaVerifiedUser(dwollaObject)
            .then((resp) => {
                console.log(resp);
            })
            .catch((error) => {
                console.log(error);
                const errorJson = JSON.parse(JSON.stringify(error));
                console.log(errorJson);
                setSubmitErrorMessage(errorJson.details.message);
            });
    };

    const continueAllowed = () => {
        const error = Object.keys(formValues)
            .map((key) => {
                return formValues[key].error;
            })
            .some((el) => el);

        return error;
    };

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="smallHeadline">
                    Personal Information
                </Typography>
                <Typography variant="description">
                    This information will be used to verify your ownership of
                    accounts provided and prevent fraud.{" "}
                </Typography>

                <Typography variant="description">
                    {`[SANDBOX ONLY] To simulate the various statuses in the Sandbox, 
                    submit either verified, retry, kba, document, or suspended 
                    in the firstName parameter `}
                </Typography>
            </Stack>

            <Grid container spacing={2} sx={{ width: "100%", mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.firstName.error}
                        helperText={formValues.firstName.errMsg}
                        name="firstName"
                        label="First Name"
                        variant="filled"
                        value={formValues.firstName.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.lastName.error}
                        helperText={formValues.lastName.errMsg}
                        name="lastName"
                        label="Last Name"
                        variant="filled"
                        value={formValues.lastName.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={8}>
                    <TextField
                        error={!!formValues.streetAddress.error}
                        helperText={formValues.streetAddress.errMsg}
                        name="streetAddress"
                        label="Street Address"
                        variant="filled"
                        value={formValues.streetAddress.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        error={!!formValues.streetAddress2.error}
                        helperText={formValues.streetAddress2.errMsg}
                        name="streetAddress2"
                        label="Apartment #"
                        variant="filled"
                        value={formValues.streetAddress2.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="city"
                        label="City"
                        variant="filled"
                        value={formValues.city.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={2}>
                    <TextField
                        error={!!formValues.state.error}
                        helperText={formValues.state.errMsg}
                        name="state"
                        label="State"
                        variant="filled"
                        value={formValues.state.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        error={!!formValues.postalCode.error}
                        helperText={formValues.postalCode.errMsg}
                        name="postalCode"
                        label="Zip Code"
                        variant="filled"
                        value={formValues.postalCode.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.phoneNumber.error}
                        helperText={formValues.phoneNumber.errMsg}
                        name="phoneNumber"
                        label="Phone Number"
                        variant="filled"
                        value={formValues.phoneNumber.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.ssn.error}
                        helperText={formValues.ssn.errMsg}
                        name="ssn"
                        label="Last four digits of SSN"
                        variant="filled"
                        value={formValues.ssn.value}
                        onChange={handleInputChange}
                        fullWidth
                        type="password"
                    ></TextField>
                </Grid>

                {submitErrorMessage && (
                    <Grid item xs={12}>
                        <Alert severity="error">
                            {"Sorry, retry! " + submitErrorMessage}
                        </Alert>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        disabled={continueAllowed()}
                        color="legendaryGreen"
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
export default UserInfo;
