import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    padding: theme.spacing(1, 1),
    textTransform: 'none',
    background: 'transparent',
    fontSize: '0.75rem',
    color: theme.palette.highlight,
    borderColor: theme.palette.highlight,
    '&:hover': {
      borderColor: theme.palette.highlight,
      background: 'transparent',
    },
  },

  // Button Outlined
  active: {
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
