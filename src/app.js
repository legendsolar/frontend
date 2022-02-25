import { ProvideAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app_router";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./app_theme";
import { ErrorBoundary } from "@sentry/react";
import ErrorPage from "./pages/error_page";

function App() {
    return (
        <ErrorBoundary fallback={<ErrorPage></ErrorPage>}>
            <ThemeProvider theme={appTheme}>
                <ProvideAuth>
                    <AppRouter></AppRouter>
                </ProvideAuth>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
