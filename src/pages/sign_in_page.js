import React from "react";

import {
    Link,
    Grid,
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import { useAuth } from "../hooks/use_auth";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/nav_bar";
import FullPageComponentView from "../views/full_page_component_view";

function SignInView() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("email: " + data.get("email"));
        console.log("password: " + data.get("password"));
        const email = data.get("email");
        const password = data.get("password");

        if (email && password) {
            auth.signin(email, password)
                .then(() => {
                    navigate(state?.path || "/");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            // TODO log failure
        }
    };

    return (
        <div>
            <FullPageComponentView>
                <Paper sx={{ p: 2, width: "500px" }}>
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
                            <Button
                                type="submit"
                                color="legendaryGreen"
                                sx={{ width: "100%" }}
                            >
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
        </div>
    );
}

export default SignInView;
