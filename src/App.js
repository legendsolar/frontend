import { ProvideAuth, useAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app-router";
import { ThemeProvider } from "@emotion/react";
import { appTheme } from "./app_theme";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <ProvideAuth>
                <AppRouter></AppRouter>;
            </ProvideAuth>
        </ThemeProvider>
    );
}

export default App;
