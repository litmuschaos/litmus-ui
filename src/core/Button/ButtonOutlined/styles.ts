import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    padding: theme.spacing(1.5, 2),
    textTransform: 'none',
    background: 'transparent',
    fontSize: '0.75rem',
    borderColor: theme.palette.highlight,
    '&:hover': {
      borderColor: theme.palette.highlight,
      background: 'transparent',
      boxShadow: `0px 4px 5px -2px ${fade(
        theme.palette.highlight,
        0.2
      )},0px 7px 10px 1px ${fade(
        theme.palette.highlight,
        0.14
      )},0px 2px 16px 1px ${fade(theme.palette.highlight, 0.12)}`,
    },
    '&:disabled': {
      borderColor: theme.palette.disabledBackground,
      color: theme.palette.text.disabled,
    },
  },

  // Button Outlined
  highlight: {
    color: theme.palette.highlight,
  },
}));

export { useStyles };
