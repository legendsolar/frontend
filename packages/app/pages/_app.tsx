import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { createEmotionCache } from "utility/createCache";
import { FirebaseAppProvider } from "reactfire";
import FirebaseWrapper from "utility/firebase_wrapper";
import { ProvideAuth } from "@project/hooks/use_auth";
import { ProvideViralLoops } from "@project/hooks/viral_loops/use_viral_loops";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utility/apollo_client";
import { appTheme, paletteOptions } from "@project/components/theme";

import { Be_Vietnam_Pro } from "@next/font/google";
import { ProvideReservations } from "@project/hooks/use_reservations";
import { DebugWindow } from "utility/debug_window";

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
      <style jsx global>{`
        body {
          background-color: ${paletteOptions.palette.whiteHaze.main};
          margin: 0px;
        }
        #__next {
        }
      `}</style>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseWrapper />
        <ThemeProvider
          theme={appTheme({ beVietnamName: beVietnam.style.fontFamily })}
        >
          <ProvideAuth>
            <ProvideViralLoops
              viralLoopsCampaignId={"kij42YdL37aNYEwJ75xCnqKBGzg"}
            >
              <ProvideReservations>
                <Component {...pageProps} />
              </ProvideReservations>
            </ProvideViralLoops>
          </ProvideAuth>
        </ThemeProvider>
      </FirebaseAppProvider>
    </ApolloProvider>
  );
};

export default App;
