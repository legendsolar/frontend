import { Container, Grid, Box } from "@mui/material";
import DefaultView from "./default_view";
import { ErrorBoundary } from "@sentry/react";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";

const SideBarNavView = (props) => {
    return (
        <DefaultView>
            <Grid container spacing={2} sx={{ mt: 6 }}>
                <Grid item xs={4}>
                    <Container
                        style={{
                            // should not be needed
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}
                        sx={{
                            height: "max-content",
                            top: "16px",
                            position: "sticky",
                            // Remove sidebar on mobile
                            display: { xs: "none", sm: "none", md: "block" },
                        }}
                    >
                        <DefaultErrorBoundary>
                            {props.drawer}
                        </DefaultErrorBoundary>
                    </Container>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        sx={{
                            zIndex: 3,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Container
                            style={{
                                // should not be needed
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                            sx={{
                                width: "100%",
                                mb: 2,
                                display: {
                                    sm: "block",
                                    sm: "block",
                                    md: "none",
                                },
                            }}
                        >
                            <DefaultErrorBoundary>
                                {props.drawer}
                            </DefaultErrorBoundary>
                        </Container>

                        <DefaultErrorBoundary>
                            {props.mainContent}
                        </DefaultErrorBoundary>
                    </Box>
                </Grid>
            </Grid>
        </DefaultView>
    );
};

export default SideBarNavView;
