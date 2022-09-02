import {Stack, Typography, Paper, Box, Grid} from '@mui/material';
import {useState} from 'react';
import {useTheme} from '@mui/material';
import DefaultView from 'views/default_view';
import {useChartDimensions} from 'hooks/use_chart_dimensions';

const SizingDemo = ({}) => {
    const theme = useTheme();

    const [color, setColor] = useState(theme.palette['legendaryGreen'].main);
    console.log('hex color: ' + color);

    const chartSettings = {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    };

    const [refBox, dms] = useChartDimensions(chartSettings);
    // const [refBox2, dms2] = useChartDimensions(chartSettings);

    const sizeRerportingBlock = (
        text,
        color = 'legendaryGreen.main',
        width = '400px',
    ) => {
        const [refBox, dms] = useChartDimensions(chartSettings);
        return (
            <Box
                sx={{
                    backgroundColor: color,
                    height: '300px',
                    width,
                }}
                ref={refBox}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="smallHeadline"
                    color={'legendaryGreen.contrastText'}
                >
                    {text + ': ' + dms.width + 'px'}
                </Typography>
            </Box>
        );
    };

    return (
        <DefaultView>
            <Stack spacing={4}>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12}>
                            {sizeRerportingBlock(
                                'full width',
                                'legendaryGreen.main',
                                '100%',
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="headline2">
                                Attempt Static Sizing
                            </Typography>
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock(
                                'static 400px column (hide?)',
                                'skyBlue.main',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={8} lg={12}>
                            {sizeRerportingBlock(
                                'static 820px column',
                                'eraserRed.main',
                                '820px',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock(
                                'static 400px column',
                                'legendaryGreen.light',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock('static 400px column')}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock(
                                'static 400px column',
                                'legendaryGreen.dark',
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="headline2">
                                Flex Sizing
                            </Typography>
                        </Grid>

                        <Grid item xs={12} xl={4} lg={12}>
                            {sizeRerportingBlock(
                                'flex 400px column',
                                'skyBlue.main',
                                '100%',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={8} lg={12}>
                            {sizeRerportingBlock(
                                'flex 820px column',
                                'eraserRed.main',
                                '100%',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock(
                                'flex 400px column',
                                'legendaryGreen.light',
                                '100%',
                            )}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock('flex 400px column')}
                        </Grid>

                        <Grid item xs={12} xl={4} lg={6}>
                            {sizeRerportingBlock(
                                'flex 400px column',
                                'legendaryGreen.dark',
                                '100%',
                            )}
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <div>
                                <Grid
                                    container
                                    spacing={4}
                                    sx={{backgroundColor: 'blackDusk.main'}}
                                >
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    'legendaryGreen.main',
                                                width: '100%',
                                                height: '300px',
                                            }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                variant="smallHeadline"
                                                color="legendaryGreen.contrastText"
                                            >
                                                Nested Grid Item 1
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                backgroundColor:
                                                    'legendaryGreen.main',
                                                width: '100%',
                                                height: '300px',
                                            }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography
                                                variant="smallHeadline"
                                                color="legendaryGreen.contrastText"
                                            >
                                                Nested Grid Item 2
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    backgroundColor: 'legendaryGreen.main',
                                    width: '100%',
                                    height: '300px',
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="smallHeadline"
                                    color="legendaryGreen.contrastText"
                                >
                                    Grid Item 5
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Stack>
        </DefaultView>
    );
};

export default SizingDemo;
