import { createMuiTheme, ThemeOptions } from '@material-ui/core';

// Agument the Theme interface
declare module '@material-ui/core/styles/createMuiTheme' {
  export interface Theme {
    kuberaCoreCards: {
      kuberaChaos: {
        card: string;
        license: {
          selection: string;
          header: string;
          body: string;
        };
      };
      kuberaPropel: {
        card: string;
        license: {
          selection: string;
          header: string;
          body: string;
        };
      };
    };
  }
  // allow configuration using `createMuiTheme`
  export interface ThemeOptions {
    kuberaCoreCards?: {
      kuberaChaos?: {
        card: string;
        license: {
          selection: string;
          header: string;
          body: string;
        };
      };
      kuberaPropel?: {
        card: string;
        license: {
          selection: string;
          header: string;
          body: string;
        };
      };
    };
  }
}

// Augument the Palette interface
declare module '@material-ui/core/styles/createPalette' {
  export interface Palette {
    // Base Theme Palette
    sidebarMenu: string;
    loginBackground: string;
    disabledBackground: string;
    highlight: string;
    horizontalStepper: {
      completed: string;
      active: string;
      pending: string;
    };
    border: {
      main: string;
      success: string;
      error: string;
    };
    progressBarGradient: string;
    status: {
      running: {
        text: string;
        background: string;
      };
      completed: {
        text: string;
        background: string;
      };
      pending: {
        text: string;
        background: string;
      };
      failed: {
        text: string;
        background: string;
      };
    };
    cards: {
      background: string;
      highlight: string;
    };
    modal: {
      background: string;
      backdrop: string;
    };
  }
  // allow configuration using `createMuiTheme`
  export interface PaletteOptions {
    // Base Theme Palette options
    sidebarMenu?: string;
    loginBackground?: string;
    disabledBackground?: string;
    highlight?: string;
    horizontalStepper?: {
      completed: string;
      active: string;
      pending: string;
    };
    border?: {
      main: string;
      success: string;
      error: string;
    };
    progressBarGradient?: string;
    status?: {
      running: {
        text: string;
        background: string;
      };
      completed: {
        text: string;
        background: string;
      };
      pending: {
        text: string;
        background: string;
      };
      failed: {
        text: string;
        background: string;
      };
    };
    cards?: {
      background: string;
      highlight: string;
    };
    modal?: {
      background: string;
      backdrop: string;
    };
  }
}

// Function for creating custom themes

function createTheme(themeOptions?: ThemeOptions) {
  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1520,
        xl: 1920,
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: 'Ubuntu',
    },
    ...themeOptions,
  });
}

export { createTheme };
