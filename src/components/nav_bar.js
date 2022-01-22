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
function NavBar(props) {
    const auth = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        auth.signout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button
                    color="inherit"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Portfolio
                </Button>
                <Button
                    color="inherit"
                    onClick={() => {
                        navigate("/user");
                    }}
                >
                    Account
                </Button>
                <Button onClick={logOut} color="inherit">
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {};

export default NavBar;
