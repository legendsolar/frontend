import { useState } from "react";

import {
    Link,
    Grid,
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Stack,
    Collapse,
    Alert,
    AlertTitle,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/use_auth";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/nav_bar";
import FullPageComponentView from "../views/full_page_component_view";

function SignInView() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        if (email && password) {
            auth.signin(email, password)
                .then(() => {
                    navigate(state?.path || "/");
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessage(error.message);
                    setErrorOpen(true);
                });
        } else {
            setErrorMessage("Email and password need to be filled");
            setErrorOpen(true);
        }
    };

    return (
        <FullPageComponentView>
            <Paper sx={{ width: "500px" }} variant="container">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Stack>
                        <Typography variant="subtitle1">Log In</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Collapse in={errorOpen}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setErrorOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {errorMessage}
                            </Alert>
                        </Collapse>
                        <Button type="submit" color="legendaryGreen">
                            Log In
                        </Button>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                        >
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>

                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </FullPageComponentView>
    );
}

export default SignInView;
