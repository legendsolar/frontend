import {createTheme} from '@mui/material/styles';
import {deepmerge} from '@mui/utils';
import {
    legendaryGreen,
    whiteHaze,
    whiteFog,
    blackDawn,
    blackDusk,
    skyBlue,
    grassGreen,
    pencilYellow,
    eraserRed,
} from 'static_data/colors';

import 'theme_types';
/**
 * Named Colors
 */

const spacing = (s) => `${s * 5}px`;

const paletteOptions = {
    palette: {
        dark: {
            main: '#000',
            contrastText: '#FFF',
        },
        light: {
            main: '#FFF',
            contrastText: blackDawn,
        },
        white: {
            main: '#FFF',
            contrastText: blackDawn,
        },
        legendaryGreen: {
            main: legendaryGreen,
            light: '#708d70',
            dark: '#244124',
            contrastText: '#fff',
        },
        whiteHaze: {
            main: whiteHaze,
            contrastText: blackDawn,
            dark: '#d3d3d3',
            light: '#ededed',
        },
        whiteFog: {
            main: whiteFog,
            contrastText: blackDawn,
            dark: '#bcbcbc',
            light: '#efefef',
        },
        blackDusk: {
            main: blackDusk,
            contrastText: '#FFF',
        },
        blackDawn: {
            main: blackDawn,
            contrastText: '#FFF',
        },
        skyBlue: {
            main: skyBlue,
            contrastText: '#FFF',
            dark: '#38658e',
            light: '#6b98c1',
        },
        grassGreen: {
            main: grassGreen,
            contrastText: '#FFF',
            dark: '#26834e',
            light: '#59b681',
        },
        pencilYellow: {
            main: pencilYellow,
            contrastText: '#FFF',
            dark: '#bb8f18',
            light: '#eec24a',
        },
        eraserRed: {
            main: eraserRed,
            contrastText: '#FFF',
            dark: '#904d4c',
            light: '#c3807e',
        },
        inactive: {
            main: '#636E72',
        },

        // Override MUI defaults
        error: {
            main: eraserRed,
            contrastText: '#FFF',
            dark: '#904d4c',
            light: '#c3807e',
        },
        primary: {
            main: blackDawn,
            light: blackDusk,
            dark: whiteFog,
            contrastText: '#fff',
        },
    },
};

const typographyOptions = {
    typography: {
        fontFamily: 'Be Vietnam Pro',
        fontSize: '12px',
        lineHeight: '12px',
        color: paletteOptions.palette.blackDusk.main,
        headline1: {
            fontFamily: 'Be Vietnam Pro',
            fontWeight: 600,
            fontSize: '60px',
            lineHeight: '76px',
            color: paletteOptions.palette.blackDusk.main,
        },
        subtitle1: {
            fontFamily: 'Be Vietnam Pro',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '25px',
            color: paletteOptions.palette.blackDusk.main,
        },
        body1: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '20px',
            lineHeight: '20px',
            color: paletteOptions.palette.blackDusk.main,
        },
        headline2: {
            fontWeight: 'bold',
            fontFamily: 'Be Vietnam Pro',
            fontSize: '36px',
            lineHeight: '45.54px',
            color: paletteOptions.palette.blackDusk.main,
        },
        subtitle2: {
            fontFamily: 'Be Vietnam Pro',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '23px',
            color: paletteOptions.palette.blackDusk.main,
        },
        body2: {
            fontFamily: 'Be Vietnam Pro',
            fontWeight: 'normal',
            fontSize: '18px',
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: '22.77px',
        },
        description: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '14px',
            lineHeight: '17.71px',
            color: paletteOptions.palette.blackDusk.main,
        },
        smallHeadline: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '24px',
            fontWeight: 'bold',
            fontWeight: 700,
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: '30.36px',
        },
        subtitle3: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '14px',
            fontWeight: 600,
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: '17.71px',
        },
        label: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '12px',
            lineHeight: '15.18px',
            color: paletteOptions.palette.blackDusk.main,
            fontWeight: 400,
        },
        smallLabel: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: 600,
            color: paletteOptions.palette.blackDusk.main,
            textTransform: 'uppercase',
        },
        monoButton: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '12px',
            lineHeight: '14px',
            fontWeight: 600,
            color: paletteOptions.palette.blackDusk.main,
            textTransform: 'uppercase',
        },

        link: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '14px',
            lineHeight: '14px',
            fontWeight: 600,
            color: paletteOptions.palette.legendaryGreen.main,
            textTransform: 'uppercase',
        },
        meduimEmoji: {
            fontFamily: 'Be Vietnam Pro',
            fontSize: '25px',
            fontWeight: 600,
        },
    },
};

/**
 *  Spacing:
 *
 *  Figma:
 *     - Total Width: 1440 px
 *     - Content Width: 1235 px
 *
 *  Webflow Cutoffs:
 *     - xs: 0
 *     -
 *
 *
 */

export const themeOptions = {
    spacing: spacing,
    breakpoints: {
        values: {
            xs: 0,
            sm: 0, // webflow phone
            md: 478, // webflow landscape phone
            lg: 767, // webflow tablet
            xl: 1320 + 70, // desktop
        },
    },
    components: {
        // Careful, MuiPaper is used for non-obvious components like AppBar ect
        MuiPaper: {
            variants: [
                {
                    props: {variant: 'container'},
                    style: {
                        padding: '100px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                    },
                    props: {variant: 'none'},
                    style: {
                        padding: 0,
                        background: 'none',
                    },
                },
            ],
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.label,
                },
            },
            variants: [
                {
                    props: {variant: 'light'},
                    style: {
                        backgroundColor: paletteOptions.palette.light.main,
                        color: paletteOptions.palette.light.contrastText,
                        fontSize: '10px',
                    },
                },
                {
                    props: {variant: 'selected'},
                    style: {
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.light.contrastText,
                        fontSize: '10px',
                    },
                },
            ],
        },

        MuiDataGrid: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.subtitle3,
                    backgroundColor: 'none',
                    border: 'none',
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: 'none',
                    },

                    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within':
                        {
                            outline: 'none',
                        },

                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus':
                        {
                            outline: 'none',
                        },

                    '& .MuiDataGrid-columnHeaderTitle': {
                        ...typographyOptions.typography.subtitle3,
                    },

                    '& .MuiDataGrid-columnHeaders': {
                        minHeight: '38px',
                        backgroundColor: 'none',
                    },

                    '& .MuiDataGrid-columnSeparator': {
                        visibility: 'hidden',
                    },
                },
            },
        },

        MuiStack: {
            defaultProps: {
                spacing: 2,
            },
        },

        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            variants: [
                {
                    props: {color: 'light'},
                    style: {
                        color: paletteOptions.palette.blackDusk.main,
                    },
                },
                // Enabled "Green" button
                {
                    props: {variant: 'primary'},
                    style: {
                        backgroundColor:
                            paletteOptions.palette.legendaryGreen.main,
                        color: paletteOptions.palette.legendaryGreen
                            .contrastText,
                        fontWeight: 400,
                        height: '74px',

                        '&:hover': {
                            backgroundColor:
                                paletteOptions.palette.legendaryGreen.main,
                            boxShadow: '0px 0px 25px rgba(99, 110, 114, 0.45)',
                        },
                    },
                },
                // Disabled "Green Button"
                {
                    props: {variant: 'primary', disabled: true},
                    style: {
                        boxShadow: 'none',
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.blackDawn.main,
                        opacity: 1,

                        '&:hover': {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },
                {
                    props: {variant: 'primary', color: 'whiteFog'},
                    style: {
                        boxShadow: 'none',
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.blackDawn.main,
                        opacity: 1,

                        '&:hover': {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },
                // "Medium Button"
                {
                    props: {variant: 'secondary'},
                    style: {
                        height: '55px',
                        width: '180px',
                        backgroundColor: paletteOptions.palette.blackDawn.main,
                        color: paletteOptions.palette.blackDawn.contrastText,

                        ...typographyOptions.typography.subtitle2,

                        '&:hover': {
                            boxShadow: '0px 0px 25px rgba(99, 110, 114, 0.25)',
                        },
                    },
                },
                {
                    props: {variant: 'secondary', disabled: true},
                    style: {
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.blackDawn.main,
                    },
                },
                {
                    props: {variant: 'secondary', color: 'light'},
                    style: {
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDawn.main,
                    },
                },

                {
                    props: {variant: 'flat'},
                    style: {
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDawn.main,
                    },
                },

                // {
                //     // props: {variant: 'flat', disabled: true},
                //     // style: {
                //     //     backgroundColor: paletteOptions.palette.whiteFog.main,
                //     //     color: paletteOptions.palette.blackDawn.main,
                //     // },
                // },

                {
                    props: {variant: 'mini'},
                    style: {
                        ...typographyOptions.typography.monoButton,

                        backgroundColor: paletteOptions.palette.whiteFog.main,

                        '&:hover': {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },

                {
                    props: {variant: 'mono'},
                    style: {
                        ...typographyOptions.typography.monoButton,
                    },
                },

                {
                    props: {variant: 'bubble'},
                    style: {
                        ...typographyOptions.body2,
                        height: '43px',
                        width: 'fit-content',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        borderRadius: '40px',
                        border: '1.5px solid',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    },
                },

                {
                    props: {variant: 'header'},
                    style: {
                        fontFamily: 'Azeret Mono',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '14px',
                        height: '50px',
                        textTransform: 'uppercase',
                        color: '#FFF',
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor: 'transparent',
                        },

                        '&:disabled': {
                            color: '#FFF',
                            opacity: '0.75',
                            backgroundColor: 'transparent',
                        },
                    },
                },

                {
                    props: {variant: 'header', color: 'dark'},
                    style: {
                        fontFamily: 'Azeret Mono',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '14px',
                        height: '50px',
                        textTransform: 'uppercase',
                        color: '#000',
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor: 'transparent',
                        },

                        '&:disabled': {
                            color: '#000',
                            opacity: '0.75',
                            backgroundColor: 'transparent',
                        },
                    },
                },

                {
                    props: {variant: 'text'},
                    style: {
                        backgroundColor: 'transparent',
                        alignItems: 'start',
                        justifyContent: 'start',
                        whiteSpace: 'normal',
                        borderRadius: 'none',
                        padding: '0px',
                        color: 'none',
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor: 'transparent',
                            // color: "rgba(255, 255, 255, 0.5)",
                        },
                    },
                },

                {
                    props: {variant: 'header-outlined'},
                    style: {
                        ...typographyOptions.typography.smallLabel,
                        height: '50px',
                        color: paletteOptions.palette.white.main,
                        border: `2px solid ${paletteOptions.palette.white.main}`,
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor: 'none',
                        },
                    },
                },

                {
                    props: {variant: 'header-filled'},
                    style: {
                        ...typographyOptions.typography.subtitle1,
                        height: '50px',
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDusk.main,
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor: paletteOptions.palette.white.main,
                        },
                    },
                },

                {
                    props: {variant: 'header-filled', color: 'dark'},
                    style: {
                        ...typographyOptions.typography.smallLabel,
                        height: '50px',
                        backgroundColor: paletteOptions.palette.blackDusk.main,
                        color: paletteOptions.palette.white.main,
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor:
                                paletteOptions.palette.blackDusk.main,
                        },
                    },
                },

                {
                    props: {variant: 'medium'},
                    style: {
                        ...typographyOptions.typography.smallLabel,
                        color: paletteOptions.palette.blackDawn.main,
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        height: '44px',
                        '&:hover': {
                            opacity: '0.75',
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },

                {
                    props: {variant: 'small'},
                    style: {
                        ...typographyOptions.typography.monoButton,
                        height: '64px',
                        '&:hover': {
                            opacity: '0.75',
                        },
                    },
                },

                {
                    props: {color: 'dark', variant: 'filled'},
                    style: {
                        backgroundColor: paletteOptions.palette.dark.main,
                        color: paletteOptions.palette.dark.contrastText,
                    },
                },
                {
                    props: {color: 'dark', variant: 'outlined'},
                    style: {
                        color: paletteOptions.palette.dark.contrastText,
                        border: `1px solid ${paletteOptions.palette.dark.contrastText}`,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '20px',
                    textTransform: 'none',
                    borderRadius: '0px',
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                },
            },
        },

        // Higher class of text fields
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                fullWidth: true,
            },
        },

        // MuiTextBoxes base class
        MuiFilledInput: {
            variants: [
                {
                    props: {color: 'light'},
                    style: {
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDusk.main,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.subtitle2,
                    borderRadius: '0px',
                    backgroundColor: paletteOptions.palette.whiteHaze.main,
                    color: paletteOptions.palette.blackDusk.main,

                    borderBottom: 'none',
                    '&&&:before': {
                        borderBottom: 'none',
                    },
                    '&&:after': {
                        borderBottom: 'none',
                    },
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: 'inherit',
                        WebkitTextFillColor: 'inherit',
                        caretColor: 'inherit',
                    },
                },
            },
        },

        MuiInput: {
            defaultProps: {
                disabledUnderline: false,
            },
            input: {
                '&:-webkit-autofill': {
                    transitionDelay: '9999s',
                    transitionProperty: 'background-color, color',
                },
            },
        },

        // "Hint text" in text fields
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.subtitle2,
                    zIndex: 1,
                    color: paletteOptions.palette.blackDusk.main,
                },
            },
        },

        // Error / helper text below text fields
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.smallLabel,
                },
            },
        },

        // InputLabel helper text
        MuiInputLabel: {
            variants: [
                {
                    props: {color: 'light'},
                    style: {
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDusk.main,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    textAlign: 'center',
                    ...typographyOptions.typography.subtitle2,
                },
            },
        },

        // All checkboxes
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    width: '40px',
                    height: '40px',
                },
            },
            defaultProps: {
                disableRipple: true,
            },
        },
    },
};

const appTheme = createTheme(
    deepmerge(themeOptions, deepmerge(paletteOptions, typographyOptions)),
);

export {appTheme};
