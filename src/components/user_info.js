import { Box, Stack, Paper, Grid } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { database } from "../firebase";
import { useAuth } from "../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

function UserInfo(props) {
    const [value, setValue] = useState(0);

    const auth = useAuth();
    const user = auth.user;
    const assetId = "-MtUpMiLZ0cvkQ-Dok2z";
    const theme = useTheme();

    const saveUserInfo = () => {};

    const startingValues = {
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        phoneNumber: "",
    };

    const [formValues, setFormValues] = useState(startingValues);

    useEffect(() => {
        // set initial to saved values
        get(ref(database, "users/" + user.uid))
            .then((userInfoSnapshot) => {
                if (userInfoSnapshot && userInfoSnapshot.exists()) {
                    const userObject = userInfoSnapshot.val();
                    console.log(userInfoSnapshot.val());

                    setFormValues({
                        firstName: userObject.name.first,
                        lastName: userObject.name.last,
                        streetAddress: userObject.address.streetNumber,
                        city: userObject.address.city,
                        state: userObject.address.state,
                        phoneNumber: userObject.phone.mobile,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        set(ref(database, "users/" + user.uid + "/info"), formValues).then(
            () => {
                console.log("complete");
            }
        );
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="smallHeadline">Your Info</Typography>
                <Typography variant="description">
                    This information will be used to verify your ownership of
                    accounts provided. All information provided to Legends Solar
                    will never been shared.{" "}
                </Typography>
            </Stack>

            <Grid container spacing={2} sx={{ width: "100%", mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="filled"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="filled"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        variant="filled"
                        value={formValues.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="streetAddress"
                        label="Street Address"
                        variant="filled"
                        value={formValues.streetAddress}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="city"
                        label="City"
                        variant="filled"
                        value={formValues.city}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="state"
                        label="State"
                        variant="filled"
                        value={formValues.state}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="postalCode"
                        label="Zip Code"
                        variant="filled"
                        value={formValues.state}
                        onChange={handleInputChange}
                        fullWidth
                    ></TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
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
