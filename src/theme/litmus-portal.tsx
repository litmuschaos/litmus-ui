import { createTheme } from './base';

const LitmusPortalTheme = createTheme({
  palette: {
    primary: {
      main: '#5B44BA',
      light: '#858CDD',
      dark: '#4028A0',
    },
    secondary: {
      main: '#109B67',
      light: '#858CDD',
      dark: '#128359',
    },
    success: {
      main: '#109B67',
      light: '#109B6710',
      dark: '#128359',
    },
    background: {
      default: '#FAFBFD',
      paper: '#FFFFFF',
    },
    sidebarMenu: '#FAFBFD',
    loginBackground: '#FFFFFF',
    disabledBackground: '#E6E6E6',
    text: {
      primary: '#101217',
      secondary: '#FFFFFF',
      disabled: '#777777',
      hint: '#777777',
    },
    highlight: '#5B44BA',
    horizontalStepper: {
      completed: '#5D6173',
      active: '#2CCA8F',
      pending: '#B9B9B9',
    },
    border: {
      main: '#B9B9B9',
      success: '#109B67',
      error: '#CA2C2C',
    },
    progressBarGradient:
      'linear-gradient(90.43deg, #5B44BA 0.35%, #858CDD 51.03%, #109B67 99.64%)',
    status: {
      running: '#F6FB92B',
      completed: '#109B67',
      pending: '#B9B9B9',
      failed: '#CA2C2C',
    },
    statusBackground: {
      running: '#F6FB92B20',
      completed: '#109B6720',
      pending: '#B9B9B920',
      failed: '#CA2C2C20',
    },
    cards: {
      background: '#FFFFFF',
      highlight: '#109B6710',
    },
  },

  overrides: {
    MuiSlider: {
      thumb: {
        opacity: 0,
      },
      mark: {
        marginLeft: -6.8,
        paddingTop: 1.8,
        backgroundImage: `url(${'./icons/arrow.svg'})`,
        backgroundColor: 'none',
        '&[data-index="9"]': {
          backgroundImage: 'none',
        },
      },
      markActive: {
        backgroundImage: `url(${'./icons/arrow.svg'})`,
        backgroundColor: 'none',
      },
      markLabel: {
        fontFamily: 'Ubuntu',
        fontSize: 15,
        marginTop: -5,
        marginLeft: '-5%',
        color: 'rgba(0, 0, 0, 0.4)',
      },
      markLabelActive: {
        fontFamily: 'Ubuntu',
        fontSize: 15,
        color: '#FFFFFF',
      },
    },
    MuiTab: {
      root: {
        '&$selected': {
          color: '#5B44BA',
        },
      },
    },
    MuiFormLabel: {
      root: {
        paddingLeft: 20,
        '&[data-shrink="true"]': {
          color: '#5B44BA',
        },
      },
      asterisk: {
        color: 'transparent',
      },
    },
  },
});

export { LitmusPortalTheme };
