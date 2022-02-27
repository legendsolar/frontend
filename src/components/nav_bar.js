import React from "react";
import { useAuth } from "../hooks/use_auth";
import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { redirectToHomePage } from "../webflow/webflowLinking";
import { LegendsSolarLogo } from "./icons/legends_solar_logo";

function NavBar(props) {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Toolbar style={{ padding: 0, width: "100%" }}>
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
                    width: "100%",
                    zIndex: 1,
                    ml: 2,
                    mr: 2,
                }}
            >
                <Box
                    sx={{
                        width: "120px",
                        height: "45px",
                    }}
                    alt="logo"
                >
                    <LegendsSolarLogo></LegendsSolarLogo>
                </Box>

                {auth.user && (
                    <Stack
                        direction="row"
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        <Button
                            color="dark"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <Typography variant="appBarHeader">
                                Your Rooftop
                            </Typography>
                        </Button>

                        <Button
                            color="dark"
                            onClick={() => {
                                navigate("/transactions");
                            }}
                        >
                            <Typography variant="appBarHeader">
                                Transactions
                            </Typography>
                        </Button>

                        <Button
                            color="dark"
                            onClick={() => {
                                navigate("/documents");
                            }}
                        >
                            <Typography variant="appBarHeader">
                                Documents
                            </Typography>
                        </Button>

                        <Button
                            color="dark"
                            onClick={() => {
                                navigate("/account");
                            }}
                        >
                            <Typography variant="appBarHeader">
                                Account
                            </Typography>
                        </Button>

                        <Button
                            color="dark"
                            variant="outlined"
                            onClick={() => {
                                navigate("/explore");
                            }}
                        >
                            <Typography variant="appBarHeader">
                                Available Offerings
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
