import { CssBaseline, Theme, ThemeProvider } from "@material-ui/core";
import * as React from "react";
import { litmusPortalTheme } from "./litmus-portal";

export interface LitmusThemeProviderProps {
  theme?: Theme;
}

const LitmusThemeProvider: React.FC<LitmusThemeProviderProps> = ({
  theme,
  children,
}) => {
  const platformTheme = theme ?? litmusPortalTheme;
  return (
    <ThemeProvider theme={platformTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { LitmusThemeProvider };
