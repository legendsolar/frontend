import {useState} from 'react';
import {useTheme} from '@mui/material';
import {Paper, Button, Stack, Typography, Box, Divider} from '@mui/material';

const DesignSysDemo = (props) => {
    const theme = useTheme();

    const [color, setColor] = useState(theme.palette['legendaryGreen'].main);
    console.log('hex color: ' + color);

    return (
        <Stack spacing={2} sx={{m: 2}}>
            <Typography variant="headline1">Theme</Typography>
            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">{'Typography'}</Typography>
                    <Typography variant="headline1">{'Headline 1'}</Typography>
                    <Typography variant="subtitle1">Subtitle 1</Typography>
                    <Typography variant="body1">Body 1</Typography>
                    <Typography variant="headline2">Headline 2</Typography>
                    <Typography variant="subtitle2">Subtitle 2</Typography>
                    <Typography variant="body2">Body 2</Typography>
                    <Typography variant="description">Description</Typography>
                    <Typography variant="smallHeadline">
                        Small Headline
                    </Typography>
                    <Typography variant="subtitle3">Subtitle 3</Typography>
                    <Typography variant="label">Label</Typography>
                </Stack>
            </Paper>

            <Paper variant="container">
                <Typography variant="subtitle2">
                    {'Color Matrix (main, light, dark, contrast text color)'}
                </Typography>
                {[
                    'legendaryGreen',
                    'whiteHaze',
                    'whiteFog',
                    'blackDusk',
                    'blackDawn',
                    'skyBlue',
                    'grassGreen',
                    'pencilYellow',
                    'eraserRed',
                ].map((name) => {
                    return (
                        <Stack direction="row" alignItems="center">
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].main)
                                }
                                sx={{
                                    bgcolor: `${name}.main`,
                                    width: '50px',
                                    height: '50px',
                                    alignItems: 'center',
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].light)
                                }
                                sx={{
                                    bgcolor: `${name}.light`,
                                    width: '50px',
                                    height: '50px',
                                    alignItems: 'center',
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(theme.palette[`${name}`].dark)
                                }
                                sx={{
                                    bgcolor: `${name}.dark`,
                                    width: '50px',
                                    height: '50px',
                                    alignItems: 'center',
                                }}
                            ></Box>
                            <Box
                                onClick={() =>
                                    setColor(
                                        theme.palette[`${name}`].contrastText,
                                    )
                                }
                                sx={{
                                    bgcolor: `${name}.main`,
                                    width: '50px',
                                    height: '50px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '24px',
                                        color: `${name}.contrastText`,
                                    }}
                                >
                                    Eg
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                color="light.contrastText"
                                sx={{
                                    ml: 2,
                                }}
                            >
                                {name}
                            </Typography>
                        </Stack>
                    );
                })}

                <Typography variant="body1" sx={{mt: 2}}>
                    Selected Color:
                </Typography>
                <Box sx={{height: '50px', bgcolor: color}}></Box>
            </Paper>

            <Typography variant="headline1">Inputs</Typography>

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">Buttons </Typography>
                    <Typography variant="subtitle3">Primary</Typography>

                    <Button variant="primary">Primary Button</Button>
                    <Button variant="primary" disabled={true}>
                        Disabled
                    </Button>
                    <Typography variant="subtitle3">Secondary</Typography>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="secondary" disabled={true}>
                        Secondary Button
                    </Button>

                    <Typography variant="subtitle3">Mini</Typography>
                    <Button variant="mini">Mini Button</Button>
                    <Button variant="mini" disabled={true}>
                        Mini Button
                    </Button>
                    <Typography variant="subtitle3">Others</Typography>

                    <Button variant="bubble">Bubble Regular</Button>

                    <Button variant="bubble" sx={{color: 'eraserRed.main'}}>
                        Bubble Color
                    </Button>

                    <Button variant="header">Header Button</Button>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default DesignSysDemo;
