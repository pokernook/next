import { AppProps } from "next/app";
import { withUrqlClient, WithUrqlProps } from "next-urql";
import { FC } from "react";
import { ToastProvider } from "react-toast-notifications";
import { ThemeProvider } from "theme-ui";

import { theme } from "../theme";
import { getClientConfig } from "../urql";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider autoDismiss placement="bottom-left">
        <Component {...pageProps} />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default withUrqlClient(getClientConfig)(App as FC<WithUrqlProps>);
