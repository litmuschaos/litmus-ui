import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    padding: theme.spacing(1.5, 2),
    textTransform: 'none',
    background: theme.palette.primary.main,
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    '&:hover': {
      background: theme.palette.primary.main,
      boxShadow: `0px 4px 5px -2px ${fade(
        theme.palette.primary.main,
        0.2
      )},0px 7px 10px 1px ${fade(
        theme.palette.primary.main,
        0.14
      )},0px 2px 16px 1px ${fade(theme.palette.primary.main, 0.12)}`,
    },
    '&:disabled': {
      background: theme.palette.disabledBackground,
      color: theme.palette.text.disabled,
    },
  },

  // Button Filled
  error: {
    background: theme.palette.error.main,
    '&:hover': {
      background: theme.palette.error.main,
      boxShadow: `0px 4px 5px -2px ${fade(
        theme.palette.error.main,
        0.2
      )},0px 7px 10px 1px ${fade(
        theme.palette.error.main,
        0.14
      )},0px 2px 16px 1px ${fade(theme.palette.error.main, 0.12)}`,
    },
  },
  success: {
    background: theme.palette.success.main,
    '&:hover': {
      background: theme.palette.success.main,
      boxShadow: `0px 4px 5px -2px ${fade(
        theme.palette.success.main,
        0.2
      )},0px 7px 10px 1px ${fade(
        theme.palette.success.main,
        0.14
      )},0px 2px 16px 1px ${fade(theme.palette.success.main, 0.12)}`,
    },
  },
}));

export { useStyles };
