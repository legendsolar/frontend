import { ProvideAuth } from "./hooks/use_auth";
import AppRouter from "./routes/app_router";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./app_theme";
import { ErrorBoundary } from "@sentry/react";
import ErrorPage from "./pages/error_page";
import { Provider } from "react-redux";
import store from "./store";
import FirebaseInit from "./firebase_init";

const App = () => {
    return (
        <ErrorBoundary fallback={<ErrorPage></ErrorPage>}>
            <FirebaseInit>
                <Provider store={store}>
                    <ThemeProvider theme={appTheme}>
                        <ProvideAuth>
                            <AppRouter></AppRouter>
                        </ProvideAuth>
                    </ThemeProvider>
                </Provider>
            </FirebaseInit>
        </ErrorBoundary>
    );
};

export default App;
