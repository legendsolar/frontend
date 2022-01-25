import { ProvideAuth, useAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app-router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

const colorThemeOptions = {
    palette: {
        error: {
            main: "#B4615F",
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
    },
    typography: {
        fontFamily: "Be Vietnam Pro",
        fontSize: "12px",
        lineHeight: "12px",
        dashboardHeader: {
            fontWeight: 600,
            fontSize: "20ox",
        },
        unitMainDisplay: {
            fontWeight: 600,
            fontSize: "45px",
            lineHeight: "30px",
        },
        unitLabel: {
            fontFamily: "Azeret Mono",
            fontWeight: 600,
            fontSize: "10px",
        },
        appBarHeader: {
            fontFamily: "Azeret Mono",
            fontWeight: 600,
            fontSize: "12px",
        },
        pillLabel: {
            fontWeight: 400,
            fontSize: "6px",
            lineHeight: "8px",
        },
        metricName: {
            fontFamily: "Azeret Mono",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "14px",
        },
        metricValue: {
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "14px",
        },
    },
};

const componentThemeOptions = {
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
                    backgroundColor: colorThemeOptions.palette.inactive.main,
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
    },
};

const globalTheme = createTheme(
    deepmerge(colorThemeOptions, componentThemeOptions)
);

function App() {
    return (
        <ThemeProvider theme={globalTheme}>
            <ProvideAuth>
                <AppRouter></AppRouter>;
            </ProvideAuth>
        </ThemeProvider>
    );
}

export default App;
