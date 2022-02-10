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
                        position: "sticky",
                        // Remove sidebar on mobile
                        display: { xs: "none", sm: "block" },
                    }}
                >
                    {/* {props.drawer} */}
                    <ErrorBoundary>{props.drawer}</ErrorBoundary>
                </Container>

                <Box
                    component="main"
                    sx={{
                        zIndex: 3,
                    }}
                >
                    <Container
                        sx={{
                            display: { xs: "block", sm: "none" },
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
