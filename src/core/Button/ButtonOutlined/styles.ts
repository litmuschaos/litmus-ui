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
      boxShadow: `${fade(theme.palette.highlight, 0.5)} 0 0.3rem 0.4rem 0`,
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

export default useStyles;
