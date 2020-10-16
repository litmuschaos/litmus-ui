import { CssBaseline, Theme, ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { kuberaChaosTheme } from './kubera-chaos';
import { kuberaCoreTheme } from './kubera-core';
import { kuberaPortalTheme } from './kubera-portal';
import { kuberaPropelTheme } from './kubera-propel';
import { litmusPortalTheme } from './litmus-portal';

export interface KuberaThemeProviderProps {
  platform:
    | 'litmus-portal'
    | 'kubera-portal'
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
    case 'kubera-propel':
      return kuberaPropelTheme;
    case 'kubera-core':
      return kuberaCoreTheme;
    case 'kubera-portal':
      return kuberaPortalTheme;
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
