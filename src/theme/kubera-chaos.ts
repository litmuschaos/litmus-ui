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
      light: '#2DA6601A',
      dark: '#128359',
    },
    error: {
      main: '#CA2C2C',
      light: '#CA2C2C1A',
      dark: '#A62F28',
    },
    warning: {
      main: '#F6B92B',
      light: '#F6B92B33',
      dark: '#402C01',
    },
    background: {
      default:
        'linear-gradient(67.59deg, #0F2625 -0.71%, #112826 24.2%, #172D2B 98.91%)',
      paper: '#1C2126',
    },
    sidebarMenu: '#0E2120',
    loginBackground: 'linear-gradient(180deg, #20605C 0%, #153F3C 100%)',
    disabledBackground: '#2B333B',
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
        text: '#F6B92B',
        background: '#F6B92B80',
      },
      completed: {
        text: '#2DA660',
        background: '#2DA66033',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B980',
      },
      failed: {
        text: '#CA2C2C',
        background: '#CA2C2C80',
      },
    },
    cards: {
      background: '#2B333B',
      highlight: '#2DA660',
    },
    modal: {
      background: '#1C2126',
      backdrop: '#00000099',
    },
  },

  // Kubera Chaos Additional Theme Options

  graph: {
    interleaveRed: '#6A2625',
    dashboard: {
      lightBlue: '#08BBD7',
      lightOrange: '#F6B92B',
    },
    line: {
      violet: '#A93DDB',
      violetLight: '#A05195',
      brightPink: '#D45087',
      darkPink: '#CC556A',
      yellow: '#FFA600',
      darkYellow: '#DFA73E',
      orange: '#F6793E',
      lightGreen: '#6DA966',
      lightBlue: '#51C9DA',
      darkBlue: '#2F4B7C',
    },
    area: {
      violet: 'linear-gradient(180deg, #A93DDB73 0%, #A93DDB00 100%)',
      violetLight: 'linear-gradient(180deg, #A0519573 0%, #A0519500 100%)',
      brightPink: 'linear-gradient(180deg, #A4508773 0%, #D4508700 100%)',
      darkPink: 'linear-gradient(180deg, #CC556A73 0%, #CC556A00 100%)',
      yellow: 'linear-gradient(180deg, #FFA60073 0%, #FFA60000 100%)',
      darkYellow: 'linear-gradient(180deg, #DFA73E73 0%, #DFA73E00 100%)',
      orange: 'linear-gradient(180deg, #F6793E73 0%, #F6793E00 100%)',
      lightGreen: 'linear-gradient(180deg, #6DA96673 0%, #6DA96600 100%)',
      lightBlue: 'linear-gradient(180deg, #51C9DA73 0%, #51C9DA00 100%)',
      darkBlue: 'linear-gradient(180deg, #2F4B7C73 0%, #2F4B7C00 100%)',
    },
  },
});

export { kuberaChaosTheme };
