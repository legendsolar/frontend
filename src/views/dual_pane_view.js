import {Container, Grid, Box, Stack} from '@mui/material';
import DefaultView from 'views/default_view';
import {ErrorBoundary} from '@sentry/react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';

const DualPaneView = ({
    leftPane,
    rightPane,
    upperLeftCorner,
    lowerRightCorner,
}) => {
    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                }}
            >
                {upperLeftCorner}
            </div>
            <Stack direction="row" spacing={0} width="100%" height="100vh">
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whiteHaze.main',
                        zIndex: -2,
                        transform: 'translate3d(0, 0, -10px)',
                    }}
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    {leftPane}
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        zIndex: -2,
                        transform: 'translate3d(0, 0, -10px)',
                    }}
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    {rightPane}
                </Box>
            </Stack>
            <div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                }}
            >
                {lowerRightCorner}
            </div>
        </div>
    );
};

export default DualPaneView;
