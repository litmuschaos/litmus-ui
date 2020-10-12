import { fade, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
    '&:selected': {
      borderColor: theme.palette.primary.dark,
      background: 'transparent',
    },
  },
  text: {
    color: theme.palette.text.primary,
  },
  disabled: {
    color: theme.palette.text.disabled,
  },
}));

export default useStyles;
