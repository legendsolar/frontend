import { useEffect } from "react";
import { useAuth } from "../hooks/use_auth";
import { Button, Stack, Typography, Toolbar, Box, AppBar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { redirectToHomePage } from "../webflow/webflowLinking";
import { LegendsSolarLogo } from "./icons/legends_solar_logo";
import { useCloudFunctions } from "../hooks/use_cloud_functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSignUpState } from "../slices/user_slice";
import { selectUserSignUpState } from "../slices/user_slice";

const NavBar = ({}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const cloudFunctions = useCloudFunctions();
    const dispatch = useDispatch();

    const userSignUpStateStatus = useSelector(
        (state) => state.user.signUpState.status
    );
    const userSignUpState = useSelector(selectUserSignUpState);

    useEffect(() => {
        if (userSignUpStateStatus === "idle") {
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    }, []);

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

                <Stack
                    direction="row"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    {auth.user &&
                        userSignUpState === "INSTITUTION_LINK_COMPLETE" && (
                            <>
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
                            </>
                        )}
                </Stack>

                {(!auth.user ||
                    userSignUpState !== "INSTITUTION_LINK_COMPLETE") && (
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
};

NavBar.propTypes = {};

export default NavBar;
