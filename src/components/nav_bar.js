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
    }, [dispatch, userSignUpStateStatus]);

    const backgroundColor = auth.user ? "blackDusk.main" : "blackDawn.main";

    return (
        <Toolbar style={{ padding: 0, width: "100%" }}>
            <Box
                position="absolute"
                sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: backgroundColor,
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
                    ml: 10,
                    mr: 6,
                    mt: 5,
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
                                    variant="header"
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
                                    variant="header"
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
                                    variant="header"
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
                                    variant="header"
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
                                    variant="header"
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
                        variant="medium"
                        onClick={() => {
                            redirectToHomePage();
                        }}
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
