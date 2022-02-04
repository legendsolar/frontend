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
            contrastText: "#fff",
        },
        whiteHaze: {
            main: whiteHaze,
        },
        whiteFog: {
            main: whiteFog,
        },
        blackDusk: {
            main: blackDusk,
        },
        blackDawn: {
            main: blackDawn,
        },
        skyBlue: {
            main: skyBlue,
        },
        grassGreen: {
            main: grassGreen,
        },
        pencilYellow: {
            main: pencilYellow,
        },
        eraserRed: {
            main: eraserRed,
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
            fontWeight: 400,
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
    },
    components: {
        // Careful, MuiPaper is consistently used for AppBar ect
        MuiPaper: {
            variants: [
                {
                    props: { variant: "container" },
                    style: {
                        margin: spacing(1),
                        padding: spacing(2),
                        borderRadius: "15px",
                        boxShadow: "0px 0px 15px rgba(99, 110, 114, 0.5)",
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
            variants: [
                {
                    props: { variant: "light" },
                    style: {
                        backgroundColor: "#FFF",
                        color: paletteOptions.palette.blackDawn.main,
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
                        backgroundColor: paletteOptions.palette.dark.main,
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
                    },
                },
                {
                    props: { variant: "primary" },
                    style: {
                        fontSize: "22px",
                        fontFamily: "Be Vietnam Pro",
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontFamily: "Azeret Mono",
                    fontWeight: 600,
                    fontSize: "12px",
                    margin: "10px",
                },
            },
        },
    },
};

const appTheme = createTheme(deepmerge(themeOptions, paletteOptions));

export { appTheme };
