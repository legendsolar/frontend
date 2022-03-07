import { Container, Grid, Box } from "@mui/material";
import DefaultView from "./default_view";
import { ErrorBoundary } from "@sentry/react";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";

const SideBarNavView = (props) => {
    return (
        <DefaultView>
            <Grid container spacing={2}>
                <Grid
                    item
                    md={4}
                    sx={{
                        // Remove sidebar on mobile
                        display: { xs: "none", sm: "none", md: "block" },
                    }}
                >
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
                        }}
                    >
                        <DefaultErrorBoundary>
                            {props.drawer}
                        </DefaultErrorBoundary>
                    </Container>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            zIndex: 3,
                            width: "100%",
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

                        {/** 
                        Bit of padding below the content to ensure the sidebar can scroll all the way down
                        */}
                        <Box sx={{ height: "200px" }}></Box>
                    </Box>
                </Grid>
            </Grid>
        </DefaultView>
    );
};

export default SideBarNavView;
