import {useState} from 'react';
import {useTheme} from '@mui/material';
import {
    Paper,
    Button,
    Stack,
    Grid,
    Typography,
    Box,
    Divider,
} from '@mui/material';
import LoadingText from 'components/utils/loading_text';
import IconButton from 'components/buttons/icon_button';
import GoogleLogo from 'components/icons/google_logo';
import Email from '@mui/icons-material/Email';
import TextField from 'utils/text_field';
import Component from 'components/basics/component';
import {
    BankIcon,
    CalendarIcon,
    CashIcon,
    EditFilledIcon,
    EnvelopeIcon,
    HammerIcon,
    LeafIcon,
    MagGlassIcon,
    SunIcon,
    PhoneIcon,
    CheckIcon,
    GoogleIcon,
    PinIcon,
    PowerIcon,
    UmbrellaIcon,
    UserDataIcon,
} from 'components/icons/emoji_icons';

const DesignSysDemo = (props) => {
    const theme = useTheme();

    const [color, setColor] = useState(theme.palette['legendaryGreen'].main);
    console.log('hex color: ' + color);

    return (
        <Stack spacing={2} sx={{m: 2}}>
            <Typography variant="headline1">Legends Design System</Typography>

            <Divider />

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">{'Typography'}</Typography>
                    <Typography>{'Default'}</Typography>
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
                    <Typography variant="smallLabel">Small Label</Typography>
                    <Typography variant="monoButton">Mono Button</Typography>
                    <Typography variant="Link">Link</Typography>
                    <Typography variant="mediumEmoji">Emojis ✉️ ⚡</Typography>
                </Stack>
            </Paper>

            <Divider />

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

            <Divider />

            <Typography variant="headline1">Inputs</Typography>

            <Paper variant="container">
                <Stack>
                    <Typography variant="subtitle2">Buttons </Typography>
                    <Typography variant="subtitle3">Primary</Typography>

                    <Button variant="primary">Primary Button</Button>
                    <Button variant="primary">
                        <LoadingText></LoadingText>
                    </Button>
                    <Button variant="primary" disabled={true}>
                        Disabled
                    </Button>
                    <Typography variant="subtitle3">Secondary</Typography>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="secondary" disabled={true}>
                        Secondary Button
                    </Button>

                    <IconButton
                        variant="small"
                        label="Google Icon Button"
                        color="legendaryGreen"
                        icon={<GoogleLogo height={'64px'}></GoogleLogo>}
                    ></IconButton>

                    <IconButton
                        variant="small"
                        label="Email Emoji Button"
                        color="legendaryGreen"
                        icon={<Email />}
                    ></IconButton>

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

                    <TextField label="Text Field (dark)"></TextField>

                    <TextField
                        label="Text Field (dark, error)"
                        error={'This is an error'}
                        helperText={'Helper text'}
                    ></TextField>

                    <Component haze={true}>
                        <TextField
                            color="light"
                            label="Text Field (light)"
                        ></TextField>

                        <TextField
                            color="light"
                            label="Text Field (light, error)"
                            error={'This is an error'}
                            helperText={'Helper text'}
                        ></TextField>
                    </Component>
                </Stack>
            </Paper>

            <Typography variant="subtitle2">Icons</Typography>

            <Grid container spacing={2}>
                {[
                    {
                        icon: <BankIcon></BankIcon>,
                        name: 'Bank',
                    },

                    {
                        icon: <CalendarIcon />,
                        name: 'Calendar',
                    },
                    {
                        icon: <CashIcon />,
                        name: 'Cash',
                    },
                    {
                        icon: <CheckIcon />,
                        name: 'Check',
                    },
                    {
                        icon: <EditFilledIcon />,
                        name: 'Edit Filled',
                    },
                    {
                        icon: <EnvelopeIcon />,
                        name: 'Envelope',
                    },
                    {
                        icon: <GoogleIcon />,
                        name: 'Google',
                    },
                    {
                        icon: <HammerIcon />,
                        name: 'Hammer',
                    },
                    {
                        icon: <LeafIcon />,
                        name: 'Leaf',
                    },
                    {
                        icon: <MagGlassIcon />,
                        name: 'Mag Glass',
                    },
                    {
                        icon: <PhoneIcon />,
                        name: 'Phone',
                    },
                    {
                        icon: <PinIcon />,
                        name: 'Pin',
                    },
                    {
                        icon: <PowerIcon />,
                        name: 'Power',
                    },
                    {
                        icon: <SunIcon />,
                        name: 'Sun',
                    },
                    {
                        icon: <UmbrellaIcon />,
                        name: 'Umbrella',
                    },
                    {
                        icon: <UserDataIcon />,
                        name: 'User Data',
                    },
                ].map(({icon, name}) => (
                    <Grid item>
                        <Stack alignItems={'center'}>
                            {icon}
                            <Typography variant="description">
                                {name}
                            </Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default DesignSysDemo;
