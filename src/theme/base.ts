import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// Agument the Theme interface
// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     // newProperty: {
//     // 	key: value;
//     // }
//   }
//   // allow configuration using `createMuiTheme`
//   interface ThemeOptions {
//     // newProperty?: {
//     // 	key?: value;
//     // }
//   }
// }

// Augument the Palette interface
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
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
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
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
  }
}

// Function for creating custom themes

function createTheme(themeOptions?: ThemeOptions) {
  return createMuiTheme({
    typography: {
      fontSize: 12,
      fontFamily: 'Ubuntu',
    },
    ...themeOptions,
  });
}

export { createTheme };
