import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/use_auth";
import { navigate } from "hookrouter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/Logo.png";

function NavBar(props) {
    const auth = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        auth.signout();
    };

    return (
        <AppBar position="static">
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
                <Button
                    color="inherit"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography variant="appBarHeader">Portfolio</Typography>
                </Button>
                <Button
                    color="inherit"
                    onClick={() => {
                        navigate("/user");
                    }}
                >
                    <Typography variant="appBarHeader">Account</Typography>
                </Button>
                <Button
                    onClick={logOut}
                    color="inherit"
                    variant="outlined"
                    sx={{ ml: 2 }}
                >
                    <Typography variant="appBarHeader">Logout</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {};

export default NavBar;
