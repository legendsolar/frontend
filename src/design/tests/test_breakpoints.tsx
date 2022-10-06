import {Box} from '@mui/system';
import {Typography, useTheme} from '@mui/material';
import {useChartDimensions} from 'hooks/use_chart_dimensions';

export default () => {
    const theme = useTheme();
    const [ref, settings] = useChartDimensions({
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
    });

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
            ref={ref}
        >
            <Typography sx={{position: 'absolute', top: 0, left: 0}}>
                full screen
            </Typography>
            <Box
                sx={{
                    height: '100vh',
                    width: theme.breakpoints.values.xl + 'px',
                    backgroundColor: 'whiteHaze.main',
                    position: 'relative',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography sx={{position: 'absolute', top: 0, left: 0}}>
                    xl: {theme.breakpoints.values.xl + 'px'}
                </Typography>
                <Box
                    sx={{
                        height: '100vh',
                        width: theme.breakpoints.values.lg + 'px',
                        backgroundColor: 'whiteFog.main',
                        position: 'relative',

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography sx={{position: 'absolute', top: 0, left: 0}}>
                        lg: {theme.breakpoints.values.lg + 'px'}
                    </Typography>
                    <Box
                        sx={{
                            height: '100vh',
                            width: theme.breakpoints.values.md + 'px',
                            backgroundColor: 'blackDusk.main',
                            position: 'relative',

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            color={'blackDusk.contrastText' as any}
                            sx={{position: 'absolute', top: 0, left: 0}}
                        >
                            md: {theme.breakpoints.values.md + 'px'}
                        </Typography>

                        <Box
                            sx={{
                                height: '100vh',
                                width: theme.breakpoints.values.sm + 'px',
                                backgroundColor: 'black',
                                position: 'relative',

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                color={'blackDusk.contrastText' as any}
                                sx={{position: 'absolute', top: 0, left: 0}}
                            >
                                sm: {theme.breakpoints.values.sm + 'px'}
                            </Typography>

                            <Typography color={'blackDusk.contrastText' as any}>
                                {`(${settings.width}x${settings.height})`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
