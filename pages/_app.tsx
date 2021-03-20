import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";

import { theme } from "../theme";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;