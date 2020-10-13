import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  buttonOutline: {
    minWidth: '6.875rem',
    height: '2.8125rem',
    border: '0.0625rem solid',
    textTransform: 'none',
    background: 'transparent',
  },
  valueField: {
    fontSize: '0.75rem',
  },

  // Button Outlined
  border: {
    borderColor: theme.palette.highlight,
    '&:hover': {
      borderColor: theme.palette.highlight,
      background: 'transparent',
      boxShadow: `${fade(theme.palette.highlight, 0.5)} 0 0.3rem 0.4rem 0`,
    },
    '&:disabled': {
      borderColor: theme.palette.disabledBackground,
    },
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
  text: {
    color: (props) =>
      props !== true ? theme.palette.highlight : theme.palette.text.primary,
  },
}));

export default useStyles;
