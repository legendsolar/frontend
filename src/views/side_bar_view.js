import { Container, Stack, Box } from "@mui/material";
import DefaultView from "./default_view";
import { ErrorBoundary } from "@sentry/react";

const SideBarNavView = (props) => {
    return (
        <DefaultView>
            <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
                <Container
                    style={{
                        // should not be needed
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}
                    sx={{
                        height: "max-content",
                        width: "400px",
                        top: "16px",
                        position: "sticky",
                        // Remove sidebar on mobile
                        display: { sm: "none", md: "block" },
                    }}
                >
                    <ErrorBoundary>{props.drawer}</ErrorBoundary>
                </Container>

                <Box
                    sx={{
                        zIndex: 3,
                        width: "100%",
                    }}
                >
                    <Container
                        sx={{
                            width: "100%",
                            display: { sm: "block", md: "none" },
                        }}
                    >
                        <ErrorBoundary>{props.drawer}</ErrorBoundary>
                    </Container>

                    <ErrorBoundary>{props.mainContent}</ErrorBoundary>
                </Box>
            </Stack>
        </DefaultView>
    );
};

export default SideBarNavView;
