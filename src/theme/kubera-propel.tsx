import { createTheme } from './base';

const kuberaPropelTheme = createTheme({
  palette: {
    primary: {
      main: '#EAD7A2',
      light: '#F4EACD',
      dark: '#CEC19C',
    },
    secondary: {
      main: '#EAD7A2',
      light: '#F4EACD',
      dark: '#CEC19C',
    },
    success: {
      main: '#17DB92',
      light: '#17DB921A',
      dark: '#12AB72',
    },
    error: {
      main: '#DB1717',
      light: '#DB17171A',
      dark: '#7D0D0D',
    },
    warning: {
      main: '#DBA017',
      light: '#DBA01733',
      dark: '#7D5B0D',
    },
    background: {
      default:
        'linear-gradient(67.59deg, #1F232E -0.7%, #1F232E -0.69%, #1E2945 98.91%)',
      paper: '#0B0F1A',
    },
    sidebarMenu: '#0B0F1A66',
    loginBackground: 'linear-gradient(180deg, #20605C 0%, #153F3C 100%)',
    disabledBackground: '#777777',
    text: {
      primary: '#FFFFFF',
      secondary: '#2F333D',
      disabled: '#2F333D',
      hint: '#777777',
    },
    highlight: '#EAD7A2',
    horizontalStepper: {
      completed: '#17DB92',
      active: '#EAD7A2',
      pending: '#777777',
    },
    border: {
      main: '#777777',
      success: '#17DB92',
      error: '#DB1717',
    },
    progressBarGradient:
      'linear-gradient(90.43deg, #52F995 0.35%, #F6B92B 99.62%, #F6B92B 99.63%)',
    status: {
      running: {
        text: '#DBA017',
        background: '#DBA01780',
      },
      completed: {
        text: '#17DB92',
        background: '#17DB9233',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B933',
      },
      failed: {
        text: '#DB1717',
        background: '#DB171780',
      },
    },
    cards: {
      header: '#0B0F1A',
      background: '#2B2F3B',
      highlight: '#CEC19C',
    },
    modal: {
      background: '#0B0F1A',
      backdrop: '#00000099',
    },
  },
});

export { kuberaPropelTheme };
