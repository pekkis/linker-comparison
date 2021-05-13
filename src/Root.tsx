import * as React from "react";
import { FC } from "react";
import App from "./components/App";
import { Theme, ThemeProvider } from "theme-ui";
import { BrowserRouter } from "react-router-dom";

import { funk } from "@theme-ui/presets";

const theme: Theme = {
  ...funk,

  fonts: {
    ...funk.fonts,
    body: "open-sans, sans-serif",
    heading: "open-sans, sans-serif"
  },

  styles: {
    ...funk.styles
  }
};

const Root: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Root;
