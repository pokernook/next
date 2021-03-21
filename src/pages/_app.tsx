import { AppProps } from "next/app";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import { FC } from "react";
import { ThemeProvider } from "theme-ui";

import { theme } from "../theme";
import { getClientConfig } from "../urql";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default withUrqlClient(getClientConfig)(App as FC<WithUrqlProps>);
