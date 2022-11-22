import { ProvideAuth } from "@project/hooks/use_auth";
import { ProvideUser } from "@project/hooks/use_user";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "@project/components/theme";
import { ErrorBoundary } from "@sentry/react";
import FirebaseInit from "firebase_init";
import { FirebaseAppProvider } from "reactfire";
import UnexpectedErrorPage from "pages/unexpected_error_page";
import { ProvideTransfer } from "@project/hooks/use_transfer";
import { ProvideAccount } from "@project/hooks/use_accounts";
import { ProvideStorage } from "@project/hooks/use_storage";
import { ProvideAirtable } from "@project/hooks/airtable/use_airtable";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo_client_init";

import "./index.css";

import appSettings from "app_settings";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  console.log({ env: process.env });

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
          <ApolloProvider client={client}>
            <ThemeProvider theme={appTheme}>
              <ProvideAuth>
                <ProvideUser>
                  <ProvideStorage>
                    <ProvideTransfer>
                      <ProvideAccount>
                        <ProvideAirtable>
                          <Component {...pageProps} />
                        </ProvideAirtable>
                      </ProvideAccount>
                    </ProvideTransfer>
                  </ProvideStorage>
                </ProvideUser>
              </ProvideAuth>
            </ThemeProvider>
          </ApolloProvider>
        </FirebaseInit>
      </FirebaseAppProvider>
    </ErrorBoundary>
  );
};

export default App;
