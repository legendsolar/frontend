import {
    Alert,
    Box,
    Stack,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { useAuth } from "../../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useDatabaseObjectData, useDatabase } from "reactfire";
import { useCloudFunctions } from "../../hooks/use_cloud_functions";
import LoadingComponent from "../loading_component";
import { states } from "../../utils/static_lists";

const ModifyUserInfo = ({ onValid, onChange, onLoadingChange }) => {
    const auth = useAuth();
    const user = auth.user;

    const database = useDatabase();
    const { status, data: userInfo } = useDatabaseObjectData(
        ref(database, "users/" + user.uid)
    );

    const [loading, setLoading] = useState(false);

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
        postalCode: {
            value: "",
        },
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

        if (!formData.streetAddress.value) {
            formData.streetAddress.error = true;
            formData.streetAddress.errMsg = "Street required";
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
        } else if (formData.postalCode.value.length !== 5) {
            formData.postalCode.error = true;
            formData.postalCode.errMsg = "Zip code invalid";
        } else {
            formData.postalCode.error = false;
            formData.postalCode.errMsg = undefined;
        }

        setFormValues(formData);

        const error = Object.keys(formData)
            .map((key) => {
                return formValues[key].error;
            })
            .some((el) => el);

        if (!error) {
            onValid(formData);
        }
    };

    const [formValues, setFormValues] = useState(startingValues);
    const [submitErrorMessage, setSubmitErrorMessage] = useState(undefined);

    useEffect(() => {
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
                loadedUserData.streetAddress.value = info.address.streetAddress;
                loadedUserData.streetAddress2.value =
                    info.address.streetAddress2;
                loadedUserData.city.value = info.address.city;
                loadedUserData.state.value = info.address.state;
                loadedUserData.postalCode.value = info.address.postalCode;

                setFormValues(loadedUserData);
            }
        }
    }, [status]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        const updatedObject = { ...formValues };
        updatedObject[name].value = value;
        formDataValid(updatedObject);
    };

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    return (
        <div>
            <Grid container sx={{ width: "100%" }}>
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
                        value={formValues.lastName.value}
                        onChange={handleInputChange}
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={8}>
                    <TextField
                        error={!!formValues.streetAddress.error}
                        helperText={formValues.streetAddress.errMsg}
                        name="streetAddress"
                        label="Street Address"
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
                        error={!!formValues.city.error}
                        helperText={formValues.city.errMsg}
                        name="city"
                        label="City"
                        variant="filled"
                        value={formValues.city.value}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={2}>
                    <FormControl variant="filled" fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select
                            helperText={"state"}
                            name="state"
                            value={formValues.state.value}
                            onChange={handleInputChange}
                        >
                            {states.map((state) => {
                                return (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {!!formValues.state.error ? (
                            <FormHelperText error>
                                {formValues.state.errMsg}
                            </FormHelperText>
                        ) : (
                            <></>
                        )}
                    </FormControl>
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
            </Grid>
        </div>
    );
};
export default ModifyUserInfo;
