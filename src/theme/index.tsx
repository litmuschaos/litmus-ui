import { CssBaseline } from '@material-ui/core';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { kuberaChaosTheme } from './kubera-chaos';
import { litmusPortalTheme } from './litmus-portal';

interface KuberaThemeProviderProps {
  platform:
    | 'litmus-portal'
    | 'kubera-chaos'
    | 'kubera-propel'
    | 'kubera-core'
    | 'kubera-subscription';
}

function getTheme(themeLabel: string): Theme {
  switch (themeLabel) {
    case 'litmus-portal':
      return litmusPortalTheme;
    case 'kubera-chaos':
      return kuberaChaosTheme;
    default:
      return kuberaChaosTheme;
  }
}

const KuberaThemeProvider: React.FC<KuberaThemeProviderProps> = ({
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

export { KuberaThemeProvider };
