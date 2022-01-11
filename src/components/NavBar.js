import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";
import { navigate } from "hookrouter";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
function NavBar(props) {
    const auth = useAuth();

    const logOut = () => {
        auth.signout();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Your Rooftop</Button>
                    <Button color="inherit">Settings</Button>
                    <Button onClick={logOut} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

NavBar.propTypes = {};

export default NavBar;
