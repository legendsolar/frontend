import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  console.log({ env: process.env });

  return <Component {...pageProps} />;
};

export default App;
