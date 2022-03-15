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
        if (userSignUpStateStatus === "idle" && auth.user) {
            dispatch(fetchUserSignUpState(cloudFunctions));
        }
    }, [dispatch, userSignUpStateStatus, auth.user]);

    return (
        <Toolbar style={{ padding: 0, width: "100%" }}>
            <Box
                sx={{
                    width: "100%",
                }}
                display="flex"
                justifyContent={"center"}
            >
                <Box
                    sx={{
                        width: "100%",
                        ml: 10,
                        mr: 10,
                        mt: 6,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"flex-end"}
                        sx={{
                            width: "100%",
                            zIndex: 1,
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

                        {auth.user &&
                            userSignUpState === "DWOLLA_ACCOUNT_VERIFIED" && (
                                <Stack
                                    direction="row"
                                    alignItems={"flex-end"}
                                    sx={
                                        {
                                            // display: { xs: "none", sm: "block" },
                                        }
                                    }
                                >
                                    <Button
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
                                        variant="header"
                                        onClick={() => {
                                            navigate("/explore");
                                        }}
                                    >
                                        <Typography variant="appBarHeader">
                                            Available Panels
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="header-outlined"
                                        onClick={() => {
                                            navigate("/account");
                                        }}
                                    >
                                        <Typography variant="appBarHeader">
                                            Account
                                        </Typography>
                                    </Button>

                                    <Stack
                                        sx={{ maxWidth: "174px" }}
                                        spacing={1}
                                    >
                                        <Typography
                                            variant="smallLabel"
                                            sx={{
                                                color: "white.main",
                                                lineHeight: "12px",
                                            }}
                                        >
                                            Legends Wallet
                                        </Typography>
                                        <Button
                                            variant="header-filled"
                                            sx={{ mt: 0 }}
                                            onClick={() => {
                                                navigate("/transfer");
                                            }}
                                        >
                                            $0.00
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}

                        {(!auth.user ||
                            userSignUpState !== "DWOLLA_ACCOUNT_VERIFIED") && (
                            <Button
                                variant="medium"
                                disabled={true}
                                onClick={() => {
                                    redirectToHomePage();
                                }}
                            >
                                Return Home
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Toolbar>
    );
};

NavBar.propTypes = {};

export default NavBar;
