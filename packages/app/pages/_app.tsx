import { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { createEmotionCache } from "utility/createCache";
import { createTheme, CssBaseline } from "@mui/material";
import { FirebaseAppProvider } from "reactfire";
import FirebaseWrapper from "utility/firebase_wrapper";
import { ProvideAuth } from "@project/hooks/use_auth";
import { ApolloProvider } from "@apollo/client";

import { client } from "../utility/apollo_client";

const lightTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const clientSideCache = createEmotionCache();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseWrapper />
        <CacheProvider value={clientSideCache}>
          <ThemeProvider theme={lightTheme}>
            <ProvideAuth>
              <CssBaseline />
              <Component {...pageProps} />;
            </ProvideAuth>
          </ThemeProvider>
        </CacheProvider>
      </FirebaseAppProvider>
    </ApolloProvider>
  );
};

export default App;
