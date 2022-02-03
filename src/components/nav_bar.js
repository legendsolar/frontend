import React from "react";
import { useAuth } from "../hooks/use_auth";
import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";

function NavBar(props) {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppBar
            position="static"
            // change to fixed to fix with drawer
            sx={{ height: "300px", zIndex: 1 }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: "30px", ml: "80px", mr: "80px", width: "100%" }}
                >
                    <Box
                        component="img"
                        sx={{
                            maxWidth: "120px",
                            maxHeight: "45px",
                        }}
                        alt="logo"
                        src={Logo}
                    ></Box>

                    {auth.user && (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    navigate("/");
                                }}
                                sx={{ ml: 2 }}
                            >
                                <Typography variant="appBarHeader">
                                    Portfolio
                                </Typography>
                            </Button>

                            <Button
                                color="inherit"
                                onClick={() => {
                                    navigate("/transactions");
                                }}
                                sx={{ ml: 2 }}
                            >
                                <Typography variant="appBarHeader">
                                    Transactions
                                </Typography>
                            </Button>

                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={() => {
                                    navigate("/account");
                                }}
                                sx={{ ml: 2 }}
                            >
                                <Typography variant="appBarHeader">
                                    Account
                                </Typography>
                            </Button>
                        </>
                    )}

                    {!auth.user && (
                        <Button
                            color="inherit"
                            onClick={() => {
                                navigate("/");
                            }}
                            variant="light"
                        >
                            Return Home
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {};

export default NavBar;
