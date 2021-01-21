import { createTheme } from './base';

const kuberaCoreTheme = createTheme({
  palette: {
    primary: {
      main: '#C34FC5',
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
      light: '#109B674D',
      dark: '#128359',
    },
    error: {
      main: '#CA2C2C',
      light: '#CA2C2C33',
      dark: '#A62F28',
    },
    warning: {
      main: '#F6B92B',
      light: '#F6B92B33',
      dark: '#402C01',
    },
    background: {
      default:
        'linear-gradient(67.59deg, #191B42 -0.7%, #191B42 -0.69%, #191B42 25.35%, #0B3147 98.91%)',
      paper: '#1C2126',
    },
    sidebarMenu: '#151535',
    loginBackground: '#FFFFFF',
    disabledBackground: '#777777',
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      disabled: '#B9B9B9',
      hint: '#B9B9B9',
    },
    highlight: '#C34FC5',
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
        background: '#DBA01780',
      },
      completed: {
        text: '#17DB92',
        background: '#17DB9233',
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
      header: '#0B0F1A',
      background: '#2B333B',
      highlight: '#C34FC5',
    },
    modal: {
      background: '#1C2126',
      backdrop: '#071F3599',
    },
  },

  // Kubera Core Additional Theme Options

  kuberaCoreCards: {
    kuberaChaos: {
      background: {
        default: 'linear-gradient(267.51deg, #118F6A 1.47%, #0C262E 100%)',
        paper:
          'linear-gradient(255.08deg, #10805E 7.37%, rgba(16, 128, 94, 0) 100%)',
      },
      button: {
        unconfigured: '#52F99540',
        configured: '#28CB69',
      },
      card: 'linear-gradient(255.08deg, #0F7B5B 7.37%, #0E5B44 100%)',
      highlight: '#52FF95',
      license: {
        selection: '#0000004D',
        header:
          'linear-gradient(256.44deg, #109B67 10.29%, rgba(4, 40, 30, 0.58) 71.07%)',
        body: 'linear-gradient(267.83deg, #074633 1.48%, #0C262E 100%)',
      },
    },
    kuberaPropel: {
      background: {
        default: 'linear-gradient(267.13deg, #E9D08C 2.06%, #7E6E42 100%)',
        paper:
          'linear-gradient(249.11deg, #E9D08C 25.9%, rgba(126, 110, 66, 0) 94.35%)',
      },
      button: {
        unconfigured: '#EAD7A240',
        configured: '#EAD7A2',
      },
      card: 'linear-gradient(264.22deg, #323E5B 2.84%, #2C354D 100%)',
      highlight: '#EAD7A2',
      license: {
        selection: '#0000004D',
        header:
          'linear-gradient(264.6deg, #E9D08C 14.02%, rgba(84, 65, 13, 0.21) 88.13%)',
        body: 'linear-gradient(264.22deg, #534A32 2.84%, #221E15 100%)',
      },
    },
  },
});

export { kuberaCoreTheme };
