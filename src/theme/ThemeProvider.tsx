import { CssBaseline, Theme, ThemeProvider } from "@material-ui/core";
import * as React from "react";
import { litmusPortalTheme } from "./litmus-portal";

export interface LitmusThemeProviderProps {
  platform: "litmus-portal";
}

function getTheme(themeLabel: string): Theme {
  switch (themeLabel) {
    case "litmus-portal":
      return litmusPortalTheme;
    default:
      return litmusPortalTheme;
  }
}

const LitmusThemeProvider: React.FC<LitmusThemeProviderProps> = ({
  platform,
  children,
}) => {
  const platformTheme = getTheme(platform);
  return (
    <ThemeProvider theme={platformTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { LitmusThemeProvider };
