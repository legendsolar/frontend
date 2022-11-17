import { ThemeProvider } from "@mui/material";
import { appTheme } from "@project/components/theme";

import {
  ApolloCache,
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";

import { authMiddleware } from "./local_auth";

export default function App({ Component, pageProps }: AppProps) {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/v1/graphql",
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authMiddleware, httpLink]),
  });

  return (
    <ThemeProvider theme={appTheme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}
