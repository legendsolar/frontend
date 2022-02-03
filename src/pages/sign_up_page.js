import * as React from "react";

import {
    Typography,
    Box,
    Grid,
    Stack,
    Link,
    TextField,
    CssBaseline,
    Button,
    Paper,
} from "@mui/material";

import { useAuth } from "../hooks/use_auth";
import { useNavigate } from "react-router-dom";
import FullPageComponentView from "../views/full_page_component_view";

export default function SignUpView() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        auth.signup(data.get("email"), data.get("password"))
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/weak-password") {
                    console.log("Error: password too weak");
                }
                console.log("sign up error");
            });
    };

    return (
        <FullPageComponentView>
            <Paper sx={{ p: 2, width: "500px" }}>
                <CssBaseline />

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Typography variant="subtitle1">Sign up</Typography>
                    <Stack>
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
                            Sign Up
                        </Button>

                        <Link href="/signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Stack>
                </Box>
            </Paper>
        </FullPageComponentView>
    );
}
