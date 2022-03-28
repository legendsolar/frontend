import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

/**
 * Named Colors
 */

const legendaryGreen = "#345D34";
const whiteHaze = "#F4F5F5";
const whiteFog = "#EBEBEB";
const blackDusk = "#2D3436";
const blackDawn = "#636E72";
const skyBlue = "#477FB2";
const grassGreen = "#30A462";
const pencilYellow = "#EAB31E";
const eraserRed = "#B4615F";

const spacing = (s) => `${s * 5}px`;

const paletteOptions = {
    palette: {
        dark: {
            main: "#000",
            contrastText: "#FFF",
        },
        light: {
            main: "#FFF",
            contrastText: blackDawn,
        },
        white: {
            main: "#FFF",
            contrastText: blackDawn,
        },
        legendaryGreen: {
            main: legendaryGreen,
            light: "#708d70",
            dark: "#244124",
            contrastText: "#fff",
        },
        whiteHaze: {
            main: whiteHaze,
            contrastText: blackDawn,
            dark: "#d3d3d3",
            light: "#ededed",
        },
        whiteFog: {
            main: whiteFog,
            contrastText: blackDawn,
            dark: "#bcbcbc",
            light: "#efefef",
        },
        blackDusk: {
            main: blackDusk,
            contrastText: "#FFF",
        },
        blackDawn: {
            main: blackDawn,
            contrastText: "#FFF",
        },
        skyBlue: {
            main: skyBlue,
            contrastText: "#FFF",
            dark: "#38658e",
            light: "#6b98c1",
        },
        grassGreen: {
            main: grassGreen,
            contrastText: "#FFF",
            dark: "#26834e",
            light: "#59b681",
        },
        pencilYellow: {
            main: pencilYellow,
            contrastText: "#FFF",
            dark: "#bb8f18",
            light: "#eec24a",
        },
        eraserRed: {
            main: eraserRed,
            contrastText: "#FFF",
            dark: "#904d4c",
            light: "#c3807e",
        },
        inactive: {
            main: "#636E72",
        },

        // Override MUI defaults
        error: {
            main: eraserRed,
            contrastText: "#FFF",
            dark: "#904d4c",
            light: "#c3807e",
        },
        primary: {
            main: blackDawn,
            light: blackDusk,
            dark: whiteFog,
            contrastText: "#fff",
        },
    },
};

const typographyOptions = {
    typography: {
        fontFamily: "Be Vietnam Pro",
        fontSize: "12px",
        lineHeight: "12px",
        color: paletteOptions.palette.blackDusk.main,
        headline1: {
            fontWeight: 600,
            fontSize: "60px",
            lineHeight: "76px",
            color: paletteOptions.palette.blackDusk.main,
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "25.3px",
            color: paletteOptions.palette.blackDusk.main,
        },
        body1: {
            fontSize: "20px",
            lineHeight: "20px",
            color: paletteOptions.palette.blackDusk.main,
        },
        headline2: {
            fontWeight: "bold",
            fontSize: "36px",
            lineHeight: "45.54px",
            color: paletteOptions.palette.blackDusk.main,
        },
        subtitle2: {
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "22.77px",
            color: paletteOptions.palette.blackDusk.main,
        },
        body2: {
            fontWeight: "normal",
            fontSize: "18px",
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: "22.77px",
        },
        description: {
            fontSize: "14px",
            lineHeight: "17.71px",
            color: paletteOptions.palette.blackDusk.main,
        },
        smallHeadline: {
            fontSize: "24px",
            fontWeight: "bold",
            fontWeight: 700,
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: "30.36px",
        },
        subtitle3: {
            fontSize: "14px",
            fontWeight: 600,
            color: paletteOptions.palette.blackDusk.main,
            lineHeight: "17.71px",
        },
        label: {
            fontSize: "12px",
            lineHeight: "15.18px",
            color: paletteOptions.palette.blackDusk.main,
            fontWeight: 400,
        },
        smallLabel: {
            fontFamily: "Azeret Mono",
            fontSize: "12px",
            lineHeight: "14px",
            fontWeight: 600,
            color: paletteOptions.palette.blackDusk.main,
            textTransform: "uppercase",
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

const themeOptions = {
    spacing: spacing,
    breakpoints: {
        values: {
            xs: 0,
            sm: 0, // webflow phone
            md: 478, // webflow landscape phone
            lg: 767, // webflow tablet
            xl: 991, // desktop
        },
    },
    components: {
        // Careful, MuiPaper is used for non-obvious components like AppBar ect
        MuiPaper: {
            variants: [
                {
                    props: { variant: "container" },
                    style: {
                        padding: spacing(4),
                        borderRadius: "15px",
                        boxShadow: "0 0 15px 0 rgb(99 110 114 / 35%)",
                        overflow: "hidden",
                    },
                },
            ],
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    textTransform: "uppercase",
                    fontSize: "10px",
                    fontFamily: "Azeret Mono",
                    fontWeight: 600,
                },
            },
            variants: [
                {
                    props: { variant: "light" },
                    style: {
                        backgroundColor: paletteOptions.palette.light.main,
                        color: paletteOptions.palette.light.contrastText,
                        textTransform: "uppercase",
                        fontSize: "10px",
                    },
                },
                {
                    props: { variant: "selected" },
                    style: {
                        backgroundColor: paletteOptions.palette.blackDawn.main,
                        color: "#FFF",
                        textTransform: "uppercase",
                        fontSize: "10px",
                    },
                },
            ],
        },

        // MuiGrid: {
        //     // Default spacing for all Grid layouts
        //     // These don't work - can't override
        //     // defaultProps: {
        //     //     rowSpacing: 2,
        //     //     columnSpacing: 2,
        //     // },
        // },

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
                    props: { color: "light" },
                    style: {
                        border: `1px solid ${paletteOptions.palette.light.contrastText}`,
                        color: paletteOptions.palette.light.contrastText,
                    },
                },
                // Enabled "Green" button
                {
                    props: { variant: "primary" },
                    style: {
                        backgroundColor:
                            paletteOptions.palette.legendaryGreen.main,
                        color: paletteOptions.palette.legendaryGreen
                            .contrastText,
                        fontWeight: 400,
                        height: "55px",
                        boxShadow: "0px 0px 25px rgba(99, 110, 114, 0.25)",

                        "&:hover": {
                            backgroundColor:
                                paletteOptions.palette.legendaryGreen.main,
                        },
                    },
                },
                // Disabled "Green Button"
                {
                    props: { variant: "primary", disabled: true },
                    style: {
                        boxShadow: "none",
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.blackDawn.main,
                        opacity: 1,

                        "&:hover": {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },
                // "Medium Button"
                {
                    props: { variant: "secondary" },
                    style: {
                        height: "55px",
                        backgroundColor: paletteOptions.palette.blackDawn.main,
                        color: paletteOptions.palette.blackDawn.contrastText,

                        "&:hover": {
                            backgroundColor:
                                paletteOptions.palette.blackDawn.main,
                        },
                    },
                },
                {
                    props: { variant: "secondary", disabled: true },
                    style: {
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.blackDawn.main,

                        "&:hover": {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },

                {
                    props: { variant: "mini" },
                    style: {
                        fontFamily: "Azeret Mono",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "14px",
                        textTransform: "uppercase",

                        backgroundColor: paletteOptions.palette.whiteFog.main,

                        "&:hover": {
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },

                {
                    props: { variant: "header" },
                    style: {
                        fontFamily: "Azeret Mono",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "14px",
                        height: "50px",
                        textTransform: "uppercase",
                        color: paletteOptions.palette.white.main,
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: "none",
                        },
                    },
                },

                {
                    props: { variant: "text" },
                    style: {
                        backgroundColor: "transparent",
                        color: "none",
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: "transparent",
                            // color: "rgba(255, 255, 255, 0.5)",
                        },
                    },
                },

                {
                    props: { variant: "header-outlined" },
                    style: {
                        ...typographyOptions.typography.smallLabel,
                        height: "50px",
                        color: paletteOptions.palette.white.main,
                        border: `1px solid ${paletteOptions.palette.white.main}`,
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: "none",
                        },
                    },
                },

                {
                    props: { variant: "header-filled" },
                    style: {
                        ...typographyOptions.typography.subtitle1,
                        height: "50px",
                        backgroundColor: paletteOptions.palette.white.main,
                        color: paletteOptions.palette.blackDusk.main,
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: paletteOptions.palette.white.main,
                        },
                    },
                },

                {
                    props: { variant: "medium" },
                    style: {
                        ...typographyOptions.typography.smallLabel,
                        color: paletteOptions.palette.blackDawn.main,
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        height: "44px",
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor:
                                paletteOptions.palette.whiteFog.main,
                        },
                    },
                },

                {
                    props: { variant: "small" },
                    style: {
                        fontFamily: "Azeret Mono",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "14px",
                        textTransform: "uppercase",
                        color: paletteOptions.palette.blackDawn.main,
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        height: "44px",
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: "none",
                        },
                    },
                },

                {
                    props: { variant: "mono" },
                    style: {
                        fontFamily: "Azeret Mono",
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "14px",
                        textTransform: "uppercase",
                        color: paletteOptions.palette.blackDawn.main,
                        backgroundColor: "none",
                        "&:hover": {
                            opacity: "0.75",
                            backgroundColor: "none",
                        },
                    },
                },

                {
                    props: { color: "dark", variant: "filled" },
                    style: {
                        backgroundColor: paletteOptions.palette.dark.main,
                        color: paletteOptions.palette.dark.contrastText,
                    },
                },
                {
                    props: { color: "dark", variant: "outlined" },
                    style: {
                        color: paletteOptions.palette.dark.contrastText,
                        border: `1px solid ${paletteOptions.palette.dark.contrastText}`,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    fontSize: "22px",
                    lineHeight: "20px",
                    textTransform: "none",
                    borderRadius: "5px",
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                },
            },
        },

        // Higher class of text fields
        MuiTextField: {
            defaultProps: {
                variant: "filled",
                fullWidth: true,
            },
        },

        // MuiTextBoxes base class
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.subtitle2,
                    borderRadius: "10px",
                    backgroundColor: paletteOptions.palette.whiteHaze.main,
                    color: paletteOptions.palette.blackDusk.main,

                    borderBottom: "none",
                    "&&&:before": {
                        borderBottom: "none",
                    },
                    "&&:after": {
                        borderBottom: "none",
                    },
                },
            },
        },

        // "Hint text" in text fields
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    ...typographyOptions.typography.subtitle2,
                    zIndex: 1,
                    color: paletteOptions.palette.blackDawn.main,
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
        // MuiInputLabel: {
        //     variants: [
        //         {
        //             // props: { variant: "filled" },
        //             // style: {
        //             //     transform: "translate(12px, 16px) scale(1)",
        //             // },
        //         },
        //     ],
        // },

        // All checkboxes
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    width: "40px",
                    height: "40px",
                },
            },
            defaultProps: {
                disableRipple: true,
            },
        },
    },
};

const appTheme = createTheme(
    deepmerge(themeOptions, deepmerge(paletteOptions, typographyOptions))
);

export { appTheme };
