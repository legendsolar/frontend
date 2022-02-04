import { Box, Stack, Paper } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { get, ref, set } from "firebase/database";
import { database } from "../Firebase";
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
    };

    const [formValues, setFormValues] = useState(startingValues);

    useEffect(() => {
        // set initial to saved values
        get(ref(database, "users/" + user.uid + "/info"))
            .then((userInfoSnapshot) => {
                if (userInfoSnapshot && userInfoSnapshot.exists()) {
                    console.log(userInfoSnapshot.val());
                    setFormValues(userInfoSnapshot.val());
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
        <Paper variant="container">
            <Typography variant="smallHeadline">Your Contact Info</Typography>
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        "& .MuiTextField-root": { m: 1 },
                    }}
                >
                    <div>
                        <TextField
                            name="firstName"
                            label="First Name"
                            variant="filled"
                            value={formValues.firstName}
                            onChange={handleInputChange}
                        ></TextField>

                        <TextField
                            name="lastName"
                            label="Last Name"
                            variant="filled"
                            value={formValues.lastName}
                            onChange={handleInputChange}
                        ></TextField>

                        <TextField
                            name="streetAddress"
                            label="Street Address"
                            variant="filled"
                            value={formValues.streetAddress}
                            onChange={handleInputChange}
                        ></TextField>

                        <TextField
                            name="aptNumber"
                            label="Apt #"
                            variant="filled"
                            value={formValues.aptNumber}
                            onChange={handleInputChange}
                        ></TextField>

                        <TextField
                            name="city"
                            label="City"
                            variant="filled"
                            value={formValues.city}
                            onChange={handleInputChange}
                        ></TextField>

                        <TextField
                            name="state"
                            label="State"
                            variant="filled"
                            value={formValues.state}
                            onChange={handleInputChange}
                        ></TextField>
                    </div>
                </Box>
                <Button
                    variant="contained"
                    color="legendaryGreen"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Stack>
        </Paper>
    );
}
export default UserInfo;
