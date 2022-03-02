import { Box, Stack, Paper, Grid } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { useAuth } from "../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useDatabaseObjectData, useDatabase } from "reactfire";

function UserInfo(props) {
    const [value, setValue] = useState(0);

    const auth = useAuth();
    const user = auth.user;
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();

    const saveUserInfo = () => {};

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

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    if (status === "success") {
        console.log({
            status,
            userInfo,
        });
    }

    const [formValues, setFormValues] = useState(startingValues);

    useEffect(() => {
        // set initial to saved values
        get(ref(database, "users/" + user.uid))
            .then((userInfoSnapshot) => {
                if (userInfoSnapshot && userInfoSnapshot.exists()) {
                    const userObject = userInfoSnapshot.val();
                    console.log(userInfoSnapshot.val());

                    const updatedObject = { ...formValues };

                    updatedObject.firstName.value = userObject.name.first;
                    updatedObject.lastName.value = userObject.name.last;
                    updatedObject.streetAddress.value =
                        userObject.address.streetNumber;
                    updatedObject.city.value = userObject.address.city;
                    updatedObject.state.value = userObject.address.state;

                    formDataValid(updatedObject);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
            formData.firstName.errMsg = undefined;
        } else {
            formData.streetAddress.error = false;
            formData.streetAddress.errMsg = undefined;
        }

        if (!formData.city.value) {
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
        } else if (!formData.postalCode.value.match(/\d{6}/g)) {
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
        // set(ref(database, "users/" + user.uid + "/info"), formValues).then(
        //     () => {
        //         console.log("complete");
        //     }
        // );
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
                <Typography variant="smallHeadline">Your Info</Typography>
                <Typography variant="description">
                    This information will be used to verify your ownership of
                    accounts provided and prevent fraud.{" "}
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

                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.streetAddress2.error}
                        helperText={formValues.streetAddress2.errMsg}
                        name="streetAddress2"
                        label="Apartment # or PO Box"
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

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
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
                        error={!!formValues.ssn.error}
                        helperText={formValues.ssn.errMsg}
                        name="ssn"
                        label="Last four digits of SSN"
                        variant="filled"
                        value={formValues.ssn.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>
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
