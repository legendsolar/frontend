import { Box, Stack, Paper, Grid, Container } from "@mui/material";
import NavBar from "../components/nav_bar";
import { ErrorBoundary } from "@sentry/react";

const FullPageComponentView = (props) => {
    return (
        <Box position="relative">
            <NavBar></NavBar>
            <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"flex-start"}
                position={"absolute"}
                sx={{
                    top: "240px",
                    width: "100%",
                    zIndex: 4,
                }}
            >
                <ErrorBoundary>{props.children}</ErrorBoundary>
            </Stack>
            <Box
                sx={{
                    width: "100%",
                    height: "60vh",
                }}
            ></Box>
        </Box>
    );
};

export default FullPageComponentView;
