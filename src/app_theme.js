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

const spacing = (s) => `${s * 8}px`;

const paletteOptions = {
    palette: {
        primary: {
            main: blackDawn,
            light: blackDusk,
            dark: whiteFog,
            contrastText: "#fff",
        },
        dark: {
            main: "#000",
            contrastText: "#FFF",
        },
        light: {
            main: "#FFF",
            contrastText: "#000",
        },
        legendaryGreen: {
            main: legendaryGreen,
            light: "#708d70",
            dark: "#244124",
            contrastText: "#fff",
        },
        whiteHaze: {
            main: whiteHaze,
            contrastText: "#000",
            dark: "#d3d3d3",
            light: "#ededed",
        },
        whiteFog: {
            main: whiteFog,
            contrastText: "#000",
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
    },
};

const themeOptions = {
    spacing: spacing,
    typography: {
        fontFamily: "Be Vietnam Pro",
        fontSize: "12px",
        lineHeight: "12px",
        headline1: {
            fontWeight: 600,
            fontSize: "60px",
            lineHeight: "76px",
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "25.3px",
        },
        body1: {
            fontSize: "20px",
            lineHeight: "20px",
        },
        headline2: {
            fontWeight: "bold",
            fontSize: "36px",
            lineHeight: "45.54px",
        },
        subtitle2: {
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "22.77px",
        },
        body2: {
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "22.77px",
        },
        description: {
            fontSize: "14px",
            lineHeight: "17.71px",
            color: blackDawn,
        },
        smallHeadline: {
            fontSize: "24px",
            fontWeight: "bold",
            fontWeight: 700,
            lineHeight: "30.36px",
        },
        subtitle3: {
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "17.71px",
        },
        label: {
            fontSize: "12px",
            lineHeight: "15.18px",
            fontWeight: 400,
        },
        smallLabel: {
            fontFamily: "Azeret Mono",
            fontSize: "10px",
            fontWeight: 800,
        },
    },
    components: {
        // Careful, MuiPaper is used for non-obvious components like AppBar ect
        MuiPaper: {
            variants: [
                {
                    props: { variant: "container" },
                    style: {
                        padding: spacing(2),
                        borderRadius: "15px",
                        boxShadow: "0px 0px 15px rgba(99, 110, 114, 0.5)",
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
        MuiButton: {
            variants: [
                {
                    props: { color: "dark" },
                    style: {
                        color: paletteOptions.palette.dark.contrastText,
                    },
                },
                {
                    props: { color: "light" },
                    style: {
                        border: `1px solid ${paletteOptions.palette.light.contrastText}`,
                        color: paletteOptions.palette.light.contrastText,
                    },
                },
                {
                    props: { color: "legendaryGreen" },
                    style: {
                        backgroundColor:
                            paletteOptions.palette.legendaryGreen.main,
                        color: paletteOptions.palette.legendaryGreen
                            .contrastText,
                        boxShadow:
                            "rgba(99, 110, 114, 0.2) 0px 0px 13.0207px 0px",
                        boxSizing: "border-box",
                        "&:hover": {
                            boxShadow: "0 0 30px 0 rgb(99 110 114 / 45%)",
                            backgroundColor:
                                paletteOptions.palette.legendaryGreen.main,
                        },
                    },
                },
                {
                    props: { variant: "primary" },
                    style: {
                        backgroundColor:
                            paletteOptions.palette.legendaryGreen.main,
                        color: paletteOptions.palette.legendaryGreen
                            .contrastText,
                        fontWeight: 400,
                        boxShadow:
                            "rgba(99, 110, 114, 0.2) 0px 0px 13.0207px 0px",
                        boxSizing: "border-box",
                        "&:hover": {
                            boxShadow: "0 0 30px 0 rgb(99 110 114 / 45%)",
                            backgroundColor:
                                paletteOptions.palette.legendaryGreen.main,
                        },
                    },
                },
                {
                    props: { variant: "primary", disabled: true },
                    style: {
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.whiteFog.contrastText,
                        opacity: 1,
                    },
                },
                {
                    props: { variant: "secondary" },
                    style: {
                        backgroundColor: paletteOptions.palette.whiteFog.main,
                        color: paletteOptions.palette.whiteFog.contrastText,
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
                    height: "65px",
                    textTransform: "none",
                    borderRadius: "5px",
                },
            },
        },

        // MuiTextBoxes
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    backgroundColor: paletteOptions.palette.whiteFog.main,
                    color: paletteOptions.palette.whiteFog.contrastText,

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

        // "Hint text"
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    zIndex: 1,
                    // color: paletteOptions.palette.whiteFog.contrastText,
                },
            },
        },

        MuiCheckbox: {
            styleOverrides: {
                root: {
                    width: "40px",
                    height: "40px",
                },
            },
        },
    },
};

const appTheme = createTheme(deepmerge(themeOptions, paletteOptions));

export { appTheme };
