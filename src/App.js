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
        dashboardHeader: {
            fontWeight: 600,
            fontSize: "20ox",
        },
        unitMainDisplay: {
            fontWeight: 600,
            fontSize: "35px",
            lineHeight: "25px",
        },
        unitLabel: {
            fontFamily: "Azeret Mono",
            fontWeight: 600,
            fontSize: "10px",
        },
        pillLabel: {
            fontFamily: "Azeret Mono",
            fontWeight: 500,
            fontSize: "9px",
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
