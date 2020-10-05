import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import { theme } from './base';

const withTheme = (Component: any) => {
  function WithTheme(props: object) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithTheme;
};

export default withTheme;
