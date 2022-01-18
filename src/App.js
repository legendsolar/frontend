import { ProvideAuth, useAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app-router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const globalTheme = createTheme({
    palette: {
        error: {
            main: "#B4615F",
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
        pillLabel: {
            fontWeight: 400,
            fontSize: "6px",
            lineHeight: "8px",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    boxShadow: "0px 0px 15px rgba(99, 110, 114, 0.5)",
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
});

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
