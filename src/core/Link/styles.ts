import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    fontWeight: 'normal',
    textDecorationLine: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
      boxShadow: `0px 4px 5px -2px ${fade(
        theme.palette.highlight,
        0.2
      )},0px 7px 10px 1px ${fade(
        theme.palette.highlight,
        0.14
      )},0px 2px 16px 1px ${fade(theme.palette.highlight, 0.12)}`,
    },
    '&:focus': {
      fontWeight: 'bold',
    },
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.disabledBackground,
  },
  '@global': {
    '.active': {
      color: theme.palette.secondary.dark,
      fontWeight: 'bold',
    },
  },
}));

export { useStyles };
