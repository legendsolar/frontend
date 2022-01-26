import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import { ButtonGroup } from "@mui/material";
import { get, ref, set } from "firebase/database";
import { database } from "../Firebase";
import { useAuth } from "../hooks/use_auth";
import { Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

function BasicTabs() {
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
                throw error;
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
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 500,
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                orientation="vertical"
            >
                <Tab label="User Info" {...a11yProps(0)} />
                <Tab label="Accreditation" {...a11yProps(1)} />
                <Tab label="Investment History" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}

function UserInfo(props) {
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
                        <BasicTabs></BasicTabs>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
export default UserInfo;
