import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.45, 1.5),
    borderRadius: '0.1875rem',
    fontSize: '0.625rem',
    fontWeight: 500,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    height: 'auto',
    background: theme.palette.primary.light,
  },
  active: {
    background: theme.palette.primary.main,
  },
}));

export { useStyles };
