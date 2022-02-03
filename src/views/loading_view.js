import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import NavBar from "../components/nav_bar";
import { ErrorBoundary } from "@sentry/react";

const LoadingView = (props) => {
    return (
        <Box position="relative">
            <NavBar></NavBar>
            <Box
                sx={{
                    width: "100%",
                    height: "60vh",
                }}
            ></Box>
        </Box>
    );
};

export default LoadingView;
