import { Container, Stack, Box } from "@mui/material";
import NavBar from "../components/nav_bar";
import { ErrorBoundary } from "@sentry/react";

const SideBarNavView = (props) => {
    return (
        <Box>
            <NavBar></NavBar>
            <Stack direction="row" spacing={2}>
                <Container
                    sx={{
                        height: "max-content",
                        width: "auto",
                        top: "180px",
                        position: "sticky",
                    }}
                >
                    <ErrorBoundary>{props.drawer}</ErrorBoundary>
                </Container>

                <Box
                    component="main"
                    sx={{
                        mr: "40px",
                        zIndex: 3,
                    }}
                >
                    <ErrorBoundary>{props.mainContent}</ErrorBoundary>
                </Box>
            </Stack>
        </Box>
    );
};

export default SideBarNavView;
