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
                sx={{
                    width: "100%",
                    minHeight: "70vh",
                    zIndex: 4,
                }}
            >
                <ErrorBoundary>{props.children}</ErrorBoundary>
            </Stack>
        </Box>
    );
};

export default FullPageComponentView;
