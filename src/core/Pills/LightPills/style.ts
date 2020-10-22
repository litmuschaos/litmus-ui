import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.625, 1.5),
    borderRadius: '0.1875rem',
    fontSize: '0.625rem',
    fontWeight: 400,
    textTransform: 'none',
    height: 'auto',
  },
  success: {
    background: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  warning: {
    background: theme.palette.warning.light,
    color: theme.palette.warning.main,
  },
  danger: {
    background: theme.palette.error.light,
    color: theme.palette.error.main,
  },
}));

export { useStyles };
