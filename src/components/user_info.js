import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import { ref, set } from "firebase/database";
import { database } from "../Firebase";
import { useAuth } from "../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";

function UserInfo(props) {
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

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            minWidth: 275,
                            p: 2,
                            "& .MuiTextField-root": { m: 1 },
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            Your Contact Info
                        </Typography>
                        <Typography variant="h6">Email:</Typography>
                        <Typography variant="body2">{user.email}</Typography>
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
                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
export default UserInfo;
