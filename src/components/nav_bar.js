import React from "react";
import { useAuth } from "../hooks/use_auth";
import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";
import { redirectToHomePage } from "../webflow/webflowLinking";

function NavBar(props) {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Toolbar style={{ padding: 0 }}>
            <Box
                position="absolute"
                sx={{
                    height: "300px",
                    width: "100%",
                    bgcolor: "blackDawn.main",
                    zIndex: -10,
                }}
            ></Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    zIndex: 1,
                    mt: "30px",
                    ml: "80px",
                    mr: "80px",
                    mb: "80px",
                    width: "100%",
                }}
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
                    <Stack direction="row">
                        <Button
                            color="dark"
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
                            color="dark"
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
                            color="dark"
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
                    </Stack>
                )}

                {!auth.user && (
                    <Button
                        color="dark"
                        onClick={() => {
                            redirectToHomePage();
                        }}
                        variant="light"
                    >
                        Return Home
                    </Button>
                )}
            </Stack>
        </Toolbar>
    );
}

NavBar.propTypes = {};

export default NavBar;
