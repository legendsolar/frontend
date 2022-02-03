import { createTheme } from "@mui/material";
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

const colorOptions = {
    palette: {
        primary: {
            main: blackDawn,
            light: blackDusk,
            dark: whiteFog,
            contrastText: "#fff",
        },
        green: {
            main: legendaryGreen,
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
        cashGreen: {
            main: "#30A462",
        },
        carbonBlue: {
            main: "#477FB2",
        },
        electricYellow: {
            main: "#EAB31E",
        },
        inactive: {
            main: "#636E72",
        },
        blacks: {
            main: "636E72",
        },
    },
};

const typographyOptions = {
    typography: {
        fontFamily: "Be Vietnam Pro",
        fontSize: "12px",
        lineHeight: "12px",
        headline1: {
            fontWeight: 700,
            fontSize: "60ox",
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: "20ox",
        },
        body1: {
            fontSize: "20ox",
        },
        headline2: {
            fontWeight: "bold",
            fontSize: "36px",
        },
        subtitle2: {
            fontWeight: 600,
            fontSize: "18px",
        },
        body2: {
            fontSize: "18px",
        },
        description: {
            fontSize: "18px",
            color: blackDawn,
        },
        smallHeadline: {
            fontSize: "24px",
            fontWeight: "bold",
        },
        subtitle3: {
            fontSize: "14px",
            fontWeight: 600,
        },
        label: {
            fontSize: "12px",
        },
    },
};

const componentOptions = {
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    boxShadow: "0px 0px 15px rgba(99, 110, 114, 0.5)",
                },
            },
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
                    height: "16px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Azeret Mono",
                    fontWeight: 600,
                    fontSize: "12px",
                },
            },
        },
    },
};

const appTheme = createTheme(
    deepmerge(colorOptions, componentOptions, typographyOptions)
);

export { appTheme };
