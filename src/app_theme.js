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

const typographyOptions = {
    typography: {
        fontFamily: "Be Vietnam Pro",
        fontSize: "12px",
        lineHeight: "12px",
        headline1: {
            fontFamily: "Be Vietnam Pro",
            fontWeight: 600,
            fontSize: "60px",
            lineHeight: "76px",
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: "20px",
        },
        body1: {
            fontSize: "20px",
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
        // Careful, MuiPaper is consistently used for AppBar ect
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
            variants: [
                {
                    props: { color: "dark" },
                    style: {
                        backgroundColor: colorOptions.palette.dark.main,
                        color: colorOptions.palette.dark.contrastText,
                    },
                },
                {
                    props: { color: "light" },
                    style: {
                        border: `1px solid ${colorOptions.palette.light.contrastText}`,
                        color: colorOptions.palette.light.contrastText,
                    },
                },
                {
                    props: { color: "legendaryGreen" },
                    style: {
                        backgroundColor:
                            colorOptions.palette.legendaryGreen.main,
                        color: colorOptions.palette.legendaryGreen.contrastText,
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

const appTheme = createTheme(
    deepmerge(colorOptions, componentOptions, typographyOptions)
);

console.log(appTheme);

export { appTheme };
