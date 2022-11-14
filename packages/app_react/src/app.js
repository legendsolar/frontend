import {ProvideAuth} from '@project/hooks/use_auth';
import {ProvideUser} from '@project/hooks/use_user';
import AppRouter from 'routes/app_router';
import {ThemeProvider} from '@mui/material/styles';
import {appTheme} from 'app_theme';
import {ErrorBoundary} from '@sentry/react';
import FirebaseInit from 'firebase_init';
import {FirebaseAppProvider} from 'reactfire';
import UnexpectedErrorPage from 'pages/unexpected_error_page';
import {ProvideTransfer} from '@project/hooks/use_transfer';
import {ProvideAccount} from '@project/hooks/use_accounts';
import {ProvideStorage} from '@project/hooks/use_storage';
import {ProvideAirtable} from '@project/hooks/airtable/use_airtable';

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
                    <ThemeProvider theme={appTheme}>
                        <ProvideAuth>
                            <ProvideUser>
                                <ProvideStorage>
                                    <ProvideTransfer>
                                        <ProvideAccount>
                                            <ProvideAirtable>
                                                <AppRouter></AppRouter>
                                            </ProvideAirtable>
                                        </ProvideAccount>
                                    </ProvideTransfer>
                                </ProvideStorage>
                            </ProvideUser>
                        </ProvideAuth>
                    </ThemeProvider>
                </FirebaseInit>
            </FirebaseAppProvider>
        </ErrorBoundary>
    );
};

export default App;
