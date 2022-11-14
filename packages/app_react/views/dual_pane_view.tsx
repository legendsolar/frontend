import {Container, Grid, Box, Stack} from '@mui/material';
import DefaultView from 'views/default_view';
import {ErrorBoundary} from '@sentry/react';
import DefaultErrorBoundary from '../errors/default_error_boundary';
import LegendsTypemarkSVG from 'assets/logos/typemark_dark.svg';
import {whiteHaze} from 'static/colors';

interface DualPaneViewProps {
    leftPane?: JSX.Element;
    rightPane?: JSX.Element;
    upperLeftCorner?: JSX.Element;
    lowerRightCorner?: JSX.Element;
    paneToHide?: 'left' | 'right';
    options?: any;
}

const DualPaneView = ({
    leftPane,
    rightPane,
    upperLeftCorner,
    lowerRightCorner,
    options,
    paneToHide = 'right',
}: DualPaneViewProps) => {
    const defaultLowerRightCorner = lowerRightCorner ? (
        lowerRightCorner
    ) : (
        <img src={LegendsTypemarkSVG}></img>
    );

    const leftPaneJustify = options?.leftPane?.justifyContent
        ? options?.leftPane?.justifyContent
        : 'center';

    const rightPaneJustify = options?.rightPane?.justifyContent
        ? options?.rightPane?.justifyContent
        : 'center';

    return (
        <Box
            sx={{
                minHeight: '100vh',

                backgroundColor: {
                    xs: 'whiteHaze.main',
                    lg: 'none',
                },
            }}
        >
            <Box
                sx={{
                    position: {
                        xs: 'static',
                        lg: 'absolute',
                    },
                    top: '40px',
                    left: '40px',
                    p: {
                        xs: 5,
                        lg: 0,
                    },
                }}
            >
                {upperLeftCorner}
            </Box>
            <Stack direction="row" spacing={0} width="100%">
                <Box
                    sx={{
                        width: '100%',

                        minHeight: {
                            xs: '100%',
                            lg: '100vh',
                        },
                        display: {
                            xs: paneToHide === 'left' ? 'none' : 'flex',
                            lg: 'flex',
                        },

                        backgroundColor: 'whiteHaze.main',
                    }}
                    display="flex"
                    justifyContent={leftPaneJustify}
                    alignItems="center"
                >
                    {leftPane}
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        minHeight: {
                            xs: '100%',
                            lg: '100vh',
                        },
                        display: {
                            xs: paneToHide === 'right' ? 'none' : 'flex',
                            lg: 'flex',
                        },

                        backgroundColor: {
                            xs: 'white.main',
                        },
                    }}
                    justifyContent={rightPaneJustify}
                    alignItems="center"
                >
                    {rightPane}
                </Box>
            </Stack>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    display: {
                        xs: 'none',
                        lg: 'flex',
                    },
                }}
            >
                {defaultLowerRightCorner}
            </Box>
        </Box>
    );
};

export default DualPaneView;
