import {Container, Grid, Box, Stack} from '@mui/material';
import DefaultView from 'views/default_view';
import {ErrorBoundary} from '@sentry/react';
import DefaultErrorBoundary from 'components/errors/default_error_boundary';
import LegendsTypemarkSVG from 'assets/logos/typemark_dark.svg';

interface DualPaneViewProps {
    leftPane?: JSX.Element;
    rightPane?: JSX.Element;
    upperLeftCorner?: JSX.Element;
    lowerRightCorner?: JSX.Element;
    options?: any;
}

const DualPaneView = ({
    leftPane,
    rightPane,
    upperLeftCorner,
    lowerRightCorner,
    options,
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
        <div style={{height: '100vh'}}>
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
                        height: '100%',
                    }}
                    display="flex"
                    justifyContent={rightPaneJustify}
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
                {defaultLowerRightCorner}
            </div>
        </div>
    );
};

export default DualPaneView;
