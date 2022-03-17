import { Container, Grid, Box } from "@mui/material";
import DefaultView from "./default_view";
import { ErrorBoundary } from "@sentry/react";
import DefaultErrorBoundary from "../components/errors/default_error_boundary";

const SideBarView = ({
    drawer,
    mainContent,
    header,
    drawerAppearsOnTop = true,
    drawerAppearsOnBotton = false,
}) => {
    const wrappedDrawer = (
        <Container
            sx={{
                width: "100%",
                pl: 0,
                pr: 0,
                mb: {
                    sm: 2,
                    md: 0,
                },
                display: {
                    sm: "block",
                    md: "none",
                },
            }}
        >
            <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
        </Container>
    );

    const getDrawerTop = () => {
        if (drawerAppearsOnTop)
            return (
                <Container
                    sx={{
                        width: "100%",
                        pl: 0,
                        pr: 0,
                        mb: {
                            sm: 4,
                            md: 0,
                        },
                        display: {
                            sm: "block",
                            md: "none",
                        },
                    }}
                >
                    <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                </Container>
            );

        return null;
    };

    const getDrawerBottom = () => {
        if (drawerAppearsOnBotton)
            return (
                <Container
                    sx={{
                        width: "100%",
                        pl: 0,
                        pr: 0,
                        mt: {
                            sm: 4,
                            md: 0,
                        },
                        display: {
                            sm: "block",
                            md: "none",
                        },
                    }}
                >
                    <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                </Container>
            );

        return null;
    };

    return (
        <DefaultView>
            <Grid container rowSpacing={7}>
                {!!header && (
                    <Grid item xs={12}>
                        {header}
                    </Grid>
                )}

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
                        <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                    </Container>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            zIndex: 3,
                            width: "100%",
                        }}
                    >
                        {getDrawerTop()}
                        <DefaultErrorBoundary>
                            <Box sx={{ mt: { xs: 4, md: 0 } }}>
                                {mainContent}
                            </Box>
                        </DefaultErrorBoundary>

                        {getDrawerBottom()}

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

export default SideBarView;
