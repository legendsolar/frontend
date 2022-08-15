import {Container, Grid, Box} from '@mui/material';
import DefaultView from 'views/default_view';
import {ErrorBoundary} from '@sentry/react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';

const SideBarView = ({
    drawer = <></>,
    mainContent = <></>,
    header = <></>,
    drawerAppearsOnTop = true,
    drawerAppearsOnBotton = false,
    drawerAppearsOnLeft = false,
}) => {
    const wrappedDrawer = (
        <Container
            sx={{
                width: '100%',
                pl: 0,
                pr: 0,
                mb: {
                    sm: 2,
                    md: 0,
                },
                display: {
                    sm: 'block',
                    md: 'none',
                },
            }}
        >
            <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
        </Container>
    );

    const getDrawerTop = () => {
        if (drawerAppearsOnTop)
            return (
                <Box
                    sx={{
                        width: '100%',
                        pl: 0,
                        pr: 0,
                        mb: {
                            sm: 4,
                            md: 0,
                        },
                        display: {
                            sm: 'block',
                            md: 'none',
                        },
                    }}
                >
                    <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                </Box>
            );

        return null;
    };

    const getDrawerBottom = () => {
        if (drawerAppearsOnBotton)
            return (
                <Box
                    sx={{
                        width: '100%',
                        pl: 0,
                        pr: 0,
                        mt: {
                            sm: 4,
                            md: 0,
                        },
                        display: {
                            sm: 'block',
                            md: 'none',
                        },
                    }}
                >
                    <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                </Box>
            );

        return null;
    };

    return (
        <Grid container columnSpacing={4}>
            <Grid
                item
                md={4}
                sx={{
                    // Remove sidebar on mobile
                    display: {xs: 'none', sm: 'none', md: 'block'},
                }}
            >
                <Box
                    style={{
                        // should not be needed
                        paddingLeft: 0,
                        paddingRight: 40,
                    }}
                    sx={{
                        height: 'max-content',
                        top: '16px',
                        position: 'sticky',
                    }}
                >
                    <DefaultErrorBoundary>{drawer}</DefaultErrorBoundary>
                </Box>
            </Grid>

            <Grid item xs={12} md={8}>
                <Box
                    sx={{
                        zIndex: 3,
                        width: '100%',
                    }}
                >
                    {getDrawerTop()}

                    {!!header && (
                        <DefaultErrorBoundary>
                            <Box sx={{mb: 4}}> {header}</Box>
                        </DefaultErrorBoundary>
                    )}

                    <DefaultErrorBoundary>
                        <Box sx={{mt: {xs: 4, md: 0}}}>{mainContent}</Box>
                    </DefaultErrorBoundary>

                    {getDrawerBottom()}

                    {/** 
                        Bit of padding below the content to ensure the sidebar can scroll all the way down
                        */}
                    <Box sx={{height: '200px'}}></Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SideBarView;
