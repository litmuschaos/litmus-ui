import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

// Agument the Theme interface
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    // newProperty: {
    // 	key: value;
    // }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    // newProperty?: {
    // 	key?: value;
    // }
  }
}

// Augument the Palette interface
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    // Augmenting Litmus Portal Custom Theme Palette
    sidebarMenu?: string;
    loginBackground?: string;
    disabledBackground?: string;
    highlight?: string;
    horizontalStepper?: {
      completed?: string;
      active?: string;
      pending?: string;
    };
    border?: {
      main?: string;
      success?: string;
      error?: string;
    };
    progressBarGradient?: string;
    status?: {
      running?: string;
      completed?: string;
      pending?: string;
      failed?: string;
    };
    statusBackground?: {
      running?: string;
      completed?: string;
      pending?: string;
      failed?: string;
    };
    cards?: {
      background?: string;
      highlight?: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    // Augmenting Litmus Portal Custom Theme Palette Options
    sidebarMenu?: string;
    loginBackground?: string;
    disabledBackground?: string;
    highlight?: string;
    horizontalStepper?: {
      completed?: string;
      active?: string;
      pending?: string;
    };
    border?: {
      main?: string;
      success?: string;
      error?: string;
    };
    progressBarGradient?: string;
    status?: {
      running?: string;
      completed?: string;
      pending?: string;
      failed?: string;
    };
    statusBackground?: {
      running?: string;
      completed?: string;
      pending?: string;
      failed?: string;
    };
    cards?: {
      background?: string;
      highlight?: string;
    };
  }
}
function createTheme(
  themeOptions?: ThemeOptions,
  paletteOptions?: PaletteOptions
) {
  return createMuiTheme({
    palette: {
      error: {
        light: '#CA2C2C10',
        main: '#CA2C2C',
        dark: '#A62F28',
      },
      warning: {
        light: '#F6B92B20',
        main: '#F6B92B',
        dark: '#402C01',
      },
      ...paletteOptions,
    },
    typography: {
      fontSize: 12,
      fontFamily: 'Ubuntu',
    },
    ...themeOptions,
  });
}

const theme = createTheme({
  overrides: {},
});

export { theme, createTheme };
