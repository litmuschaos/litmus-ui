import React from "react";
import { LitmusThemeProvider } from "../src/theme/ThemeProvider";

export const decorators = [
  (Story) => (
    <LitmusThemeProvider>
      <Story />
    </LitmusThemeProvider>
  ),
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
