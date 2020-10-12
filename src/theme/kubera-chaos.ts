import { createTheme } from './base';

const kuberaChaosTheme = createTheme({
  palette: {
    primary: {
      main: '#2DA660',
      light: '#28CB69',
      dark: '#128359',
    },
    secondary: {
      main: '#2DA660',
      light:
        'linear-gradient(180deg, #12B87A 0%, #149363 99.99%, rgba(82, 249, 149, 0) 100%)',
      dark: '#128359',
    },
    success: {
      main: '#2DA660',
      light: '#2DA66010',
      dark: '#128359',
    },
    error: {
      main: '#CA2C2C',
      light: '#CA2C2C10',
      dark: '#A62F28',
    },
    warning: {
      main: '#F6B92B',
      light: '#F6B92B20',
      dark: '#402C01',
    },
    background: {
      default:
        'linear-gradient(67.59deg, #0F2625 -0.71%, #112826 24.2%, #172D2B 98.91%)',
      paper: '#1C2126',
    },
    sidebarMenu: '#132926',
    loginBackground: 'linear-gradient(180deg, #20605C 0%, #153F3C 100%)',
    disabledBackground: '#434343',
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      disabled: '#B9B9B9',
      hint: '#B9B9B9',
    },
    highlight: '#28CB69',
    horizontalStepper: {
      completed: '#2DA660',
      active: '#52F995',
      pending: '#FFFFFF',
    },
    border: {
      main: '#777777',
      success: '#109B67',
      error: '#CA2C2C',
    },
    progressBarGradient:
      'linear-gradient(90.43deg, #52F995 0.35%, #F6B92B 99.62%, #F6B92B 99.63%)',
    status: {
      running: {
        text: '#F6FB92B',
        background: '#F6FB92B50',
      },
      completed: {
        text: '#2DA660',
        background: '#2DA66050',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B950',
      },
      failed: {
        text: '#CA2C2C',
        background: '#CA2C2C50',
      },
    },
    cards: {
      background: '#2B333B',
      highlight: '#2DA660',
    },
  },

  // MUI Overrides

  overrides: {
    MuiTab: {
      root: {
        '&$selected': {
          color: '#28CB69',
        },
      },
    },
    MuiFormLabel: {
      root: {
        paddingLeft: 20,
        '&[data-shrink="true"]': {
          color: '#28CB69',
        },
      },
      asterisk: {
        color: 'transparent',
      },
    },
  },
});

export { kuberaChaosTheme };
