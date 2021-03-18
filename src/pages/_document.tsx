import {
  default as NextDocument,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { InitializeColorMode } from "theme-ui";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
