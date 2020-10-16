import { createTheme } from './base';

const kuberaPortalTheme = createTheme({
  palette: {
    primary: {
      main: '#A93DDB',
      light: '#C533FF60',
      dark: '#D4C2FC',
    },
    secondary: {
      main: '#ED5C0C',
      light: '#FC772C',
      dark: '#ED5C0C60',
    },
    success: {
      main: '#4BC6B9',
      light: '#4BC6B910',
      dark: '#4BC6B9',
    },
    error: {
      main: '#ED474A',
      light: '#ED474A10',
      dark: '#ED474A',
    },
    warning: {
      main: '#ECDD7B',
      light: '#ECDD7B40',
      dark: '#402C01',
    },
    background: {
      default: 'linear-gradient(67.42deg, #1F1044 2.02%, #360334 100.01%)',
      paper: '#130117',
    },
    sidebarMenu: '#14011830',
    loginBackground: '#FFFFFF',
    disabledBackground: '#434343',
    text: {
      primary: '#F8F8F9',
      secondary: '#FFFFFF',
      disabled: '#B9B9B9',
      hint: '#FFFFFF60',
    },
    highlight: '#DE7EDF',
    horizontalStepper: {
      completed: '#A93DDB',
      active: '#DE7EDF',
      pending: '#FFFFFF',
    },
    border: {
      main: '#FFFFFF40',
      success: '#4BC6B9',
      error: '#ED474A',
    },
    progressBarGradient:
      'linear-gradient(90.43deg, #5B44BA 0.35%, #858CDD 51.03%, #109B67 99.64%)',
    status: {
      running: {
        text: '#ECDD7B',
        background: '#ECDD7B40',
      },
      completed: {
        text: '#4BC6B9',
        background: '#109B6740',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B925',
      },
      failed: {
        text: '#ED474A',
        background: '#ED474A40',
      },
    },
    cards: {
      background: '#370844',
      highlight: '#ED5C0C',
    },
  },

  // MUI Overrides

  overrides: {
    MuiTab: {
      root: {
        '&$selected': {
          color: '#DE7EDF',
        },
      },
    },
    MuiFormLabel: {
      root: {
        paddingLeft: 20,
        '&[data-shrink="true"]': {
          color: '#DE7EDF',
        },
      },
      asterisk: {
        color: 'transparent',
      },
    },
  },
});

export { kuberaPortalTheme };
