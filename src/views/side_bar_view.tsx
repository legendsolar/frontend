import {Container, Grid, Box, Stack} from '@mui/material';
import DefaultView from 'views/default_view';
import {ErrorBoundary} from '@sentry/react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';

interface SideBarViewProps {
    drawer?: JSX.Element;
    mainContent?: JSX.Element;
    header?: JSX.Element;
    drawerPosition?: 'left' | 'right' | 'top' | 'bottom';
}

const SideBarView = ({
    drawer = <></>,
    mainContent = <></>,
    header = <></>,
    drawerPosition = 'left',
}: SideBarViewProps) => {
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

    const getDrawerPosition = (position: string) => {
        if (position === drawerPosition)
            switch (drawerPosition) {
                case 'left':
                    return (
                        <Grid
                            item
                            md={4}
                            sx={{
                                // Remove sidebar on mobile
                                display: {xs: 'none', sm: 'none', md: 'flex'},
                            }}
                        >
                            <Box
                                sx={{
                                    height: 'max-content',
                                    top: '0px',
                                    position: 'sticky',
                                    width: '100%',
                                }}
                            >
                                <DefaultErrorBoundary>
                                    {drawer}
                                </DefaultErrorBoundary>
                            </Box>
                        </Grid>
                    );
                case 'top':
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
                            <DefaultErrorBoundary>
                                {drawer}
                            </DefaultErrorBoundary>
                        </Box>
                    );

                case 'right':
                    return (
                        <Grid
                            item
                            md={4}
                            sx={{
                                // Remove sidebar on mobile
                                display: {xs: 'none', sm: 'none', md: 'flex'},
                            }}
                        >
                            <Box
                                sx={{
                                    height: 'max-content',
                                    top: '0px',
                                    position: 'sticky',
                                    width: '100%',
                                }}
                            >
                                <DefaultErrorBoundary>
                                    {drawer}
                                </DefaultErrorBoundary>
                            </Box>
                        </Grid>
                    );

                case 'bottom':
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
                            <DefaultErrorBoundary>
                                {drawer}
                            </DefaultErrorBoundary>
                        </Box>
                    );
            }

        return null;
    };

    return (
        <Stack direction={'row'} spacing={8}>
            {getDrawerPosition('left')}
            <Stack
                sx={{
                    width: '100%',
                }}
            >
                <Box>
                    {getDrawerPosition('top')}

                    {!!header && (
                        <DefaultErrorBoundary>
                            <Box sx={{mb: 4}}> {header}</Box>
                        </DefaultErrorBoundary>
                    )}

                    <DefaultErrorBoundary>
                        <Box sx={{mt: {xs: 4, md: 0}}}>{mainContent}</Box>
                    </DefaultErrorBoundary>

                    {getDrawerPosition('bottom')}
                </Box>
            </Stack>

            {getDrawerPosition('right')}
        </Stack>
    );
};

export default SideBarView;
