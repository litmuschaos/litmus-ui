import { createTheme } from './base';

const kuberaPortalTheme = createTheme({
  palette: {
    primary: {
      main: '#A93DDB',
      light: '#C533FF99',
      dark: '#D4C2FC',
    },
    secondary: {
      main: '#ED5C0C',
      light: '#FC772C',
      dark: '#ED5C0C99',
    },
    success: {
      main: '#4BC6B9',
      light: '#4BC6B91A',
      dark: '#4BC6B9',
    },
    error: {
      main: '#ED474A',
      light: '#ED474A1A',
      dark: '#ED474A',
    },
    warning: {
      main: '#ECDD7B',
      light: '#ECDD7B66',
      dark: '#402C01',
    },
    background: {
      default: 'linear-gradient(67.42deg, #1F1044 2.02%, #360334 100.01%)',
      paper: '#130117',
    },
    sidebarMenu: '#1401184D',
    loginBackground: '#FFFFFF',
    disabledBackground: '#434343',
    text: {
      primary: '#F8F8F9',
      secondary: '#FFFFFF',
      disabled: '#B9B9B9',
      hint: '#FFFFFF99',
    },
    highlight: '#DE7EDF',
    horizontalStepper: {
      completed: '#A93DDB',
      active: '#DE7EDF',
      pending: '#FFFFFF',
    },
    border: {
      main: '#FFFFFF66',
      success: '#4BC6B9',
      error: '#ED474A',
    },
    progressBarGradient:
      'linear-gradient(90.43deg, #5B44BA 0.35%, #858CDD 51.03%, #109B67 99.64%)',
    status: {
      running: {
        text: '#ECDD7B',
        background: '#ECDD7B66',
      },
      completed: {
        text: '#4BC6B9',
        background: '#109B6766',
      },
      pending: {
        text: '#B9B9B9',
        background: '#B9B9B940',
      },
      failed: {
        text: '#ED474A',
        background: '#ED474A66',
      },
    },
    cards: {
      header: '#0B0F1A',
      background: '#370844',
      highlight: '#ED5C0C',
    },
    modal: {
      background: '#130117',
      backdrop: '#1F104499',
    },
  },

  // Kubera Portal Additional Theme Options

  kuberaPortalCards: {
    kuberaChaos: {
      background:
        'linear-gradient(267.52deg, #118F6A 1.29%, rgba(12, 38, 46, 0) 100%)',
      highlight: '#52FF95',
    },
    kuberaPropel: {
      background:
        'linear-gradient(248.75deg, #C3A858 1.28%, rgba(195, 168, 88, 0) 94.35%)',
      highlight: '#EAD7A2',
    },
    kuberaPortal: {
      background:
        'linear-gradient(98.61deg, #530963 23.84%, #66194F 44.73%, #6D1E49 54.81%, #893139 68.67%, #A44131 80.98%, #CF5A25 93.11%, #E06420 108.49%)',
      highlight: '#DE7EDF',
    },
  },
});

export { kuberaPortalTheme };
