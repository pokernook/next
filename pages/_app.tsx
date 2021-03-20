import { AppProps } from "next/app";
import { FC } from "react";
import { ThemeProvider } from "theme-ui";

import { theme } from "../theme";

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
