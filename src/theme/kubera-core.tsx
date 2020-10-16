import { createTheme } from './base';

const kuberaCoreTheme = createTheme({
  palette: {
    primary: {
      main: '#D074D1',
      light: '#266C90',
      dark: '#825398',
    },
    secondary: {
      main: '#30A7C3',
      light: '#30A7C3',
      dark: '#266C90',
    },
    success: {
      main: '#109B67',
      light: '#109B6730',
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
        'linear-gradient(67.59deg, #191B42 -0.7%, #191B42 -0.69%, #191B42 25.35%, #0B3147 98.91%)',
      paper: '#1C2126',
    },
    sidebarMenu: '#14011830',
    loginBackground: '#FFFFFF',
    disabledBackground: '#777777',
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      disabled: '#B9B9B9',
      hint: '#B9B9B9',
    },
    highlight: '#D074D1',
    horizontalStepper: {
      completed: '#17DB92',
      active: '#EAD7A2',
      pending: '#777777',
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
        text: '#DBA017',
        background: '#DBA01750',
      },
      completed: {
        text: '#17DB92',
        background: '#17DB9220',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B920',
      },
      failed: {
        text: '#DB1717',
        background: '#DB171750',
      },
    },
    cards: {
      background: '#0B0F1A',
      highlight: '#D074D1',
    },
  },

  // Kubera Core Additional Theme Options

  kuberaCoreCards: {
    kuberaChaos: {
      card: 'dummy',
      license: {
        selection: 'dummy',
        header: 'dummy',
        body: 'dummy',
      },
    },
    kuberaPropel: {
      card: 'dummy',
      license: {
        selection: 'dummy',
        header: 'dummy',
        body: 'dummy',
      },
    },
  },

  // MUI Overrides

  overrides: {
    MuiTab: {
      root: {
        '&$selected': {
          color: '#D074D1',
        },
      },
    },
    MuiFormLabel: {
      root: {
        paddingLeft: 20,
        '&[data-shrink="true"]': {
          color: '#D074D1',
        },
      },
      asterisk: {
        color: 'transparent',
      },
    },
  },
});

export { kuberaCoreTheme };
