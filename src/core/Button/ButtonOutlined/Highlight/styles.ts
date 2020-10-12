import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  border: {
    borderColor: theme.palette.highlight,
    '&:hover': {
      borderColor: theme.palette.highlight,
      background: 'transparent',
      boxShadow: `${fade(theme.palette.highlight, 0.5)} 0 0.3rem 0.4rem 0`,
    },
    '&:selected': {
      borderColor: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
  text: {
    color: theme.palette.highlight,
    '&:selected': {
      color: theme.palette.primary.dark,
    },
  },
}));

export default useStyles;
