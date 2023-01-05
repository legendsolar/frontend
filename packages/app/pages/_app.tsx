import { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { createEmotionCache } from "utility/createCache";
import { CssBaseline } from "@mui/material";
import { FirebaseAppProvider } from "reactfire";
import FirebaseWrapper from "utility/firebase_wrapper";
import { ProvideAuth } from "@project/hooks/use_auth";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utility/apollo_client";
import { appTheme } from "@project/components/theme";

import { Be_Vietnam_Pro } from "@next/font/google";

const clientSideCache = createEmotionCache();

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "900"],
});

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
        <ThemeProvider
          theme={appTheme({ beVietnamName: beVietnam.style.fontFamily })}
        >
          <ProvideAuth>
            <Component {...pageProps} />;
          </ProvideAuth>
        </ThemeProvider>
      </FirebaseAppProvider>
    </ApolloProvider>
  );
};

export default App;
