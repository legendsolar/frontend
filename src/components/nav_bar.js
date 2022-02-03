import React from "react";
import { useAuth } from "../hooks/use_auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
            sx={{ height: "150px", zIndex: 1 }}
        >
            <Toolbar>
                <Box
                    component="img"
                    sx={{
                        maxWidth: 125,
                        mr: "auto",
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
                                navigate("/user");
                            }}
                            sx={{ ml: 2 }}
                        >
                            <Typography variant="appBarHeader">
                                Account
                            </Typography>
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {};

export default NavBar;
