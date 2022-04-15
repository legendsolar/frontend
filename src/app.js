import {ProvideAuth} from 'hooks/use_auth';
import AppRouter from 'routes/app_router';
import {ThemeProvider} from '@mui/material/styles';
import {appTheme} from 'app_theme';
import {ErrorBoundary} from '@sentry/react';
import {Provider} from 'react-redux';
import store from 'store';
import FirebaseInit from 'firebase_init';
import {FirebaseAppProvider} from 'reactfire';
import UnexpectedErrorPage from 'pages/unexpected_error_page';

const App = () => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    return (
        <ErrorBoundary fallback={<UnexpectedErrorPage />}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <FirebaseInit>
                    <Provider store={store}>
                        <ThemeProvider theme={appTheme}>
                            <ProvideAuth>
                                <AppRouter></AppRouter>
                            </ProvideAuth>
                        </ThemeProvider>
                    </Provider>
                </FirebaseInit>
            </FirebaseAppProvider>
        </ErrorBoundary>
    );
};

export default App;
