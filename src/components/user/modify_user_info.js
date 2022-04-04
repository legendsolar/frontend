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
import {
    validateCity,
    validateFirstName,
    validateLastName,
    validatePostalCode,
    validateState,
    validateStreetAddress,
    validateStreetAddressTwo,
} from "../../validation/user_data_validation";

const ModifyUserInfo = ({ onUpdate, onChange, onLoadingChange, disabled }) => {
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

            case "streetAddress":
                updatedObject[name] = {
                    ...validateStreetAddress(value),
                };
                break;

            case "streetAddress2":
                updatedObject[name] = {
                    ...validateStreetAddressTwo(value),
                };
                break;

            case "city":
                updatedObject[name] = {
                    ...validateCity(value),
                };
                break;

            case "state":
                updatedObject[name] = {
                    ...validateState(value),
                };
                break;

            case "postalCode":
                updatedObject[name] = {
                    ...validatePostalCode(value),
                };
                break;
        }
        updatedObject[name].value = value;
        setFormValues(updatedObject);

        onUpdate(updatedObject);
    };

    if (loading) {
        return <LoadingComponent></LoadingComponent>;
    }

    return (
        <div>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={!!formValues.firstName.error}
                        helperText={formValues.firstName.errMsg}
                        disabled={disabled?.firstName}
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
                        disabled={disabled?.firstName}
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
                        disabled={disabled?.streetAddress}
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
                        disabled={disabled?.streetAddress2}
                        name="streetAddress2"
                        label="Apt Number, PO Box, ect (optional)"
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
                        disabled={disabled?.city}
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
                            disabled={disabled?.state}
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
                        disabled={disabled?.postalCode}
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
