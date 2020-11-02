import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0.45, 1.5),
    borderRadius: '0.1875rem',
    fontSize: '0.625rem',
    fontWeight: 500,
    textTransform: 'none',
    color: theme.palette.primary.light,
    height: 'auto',
    background: 'transparent',
    border: `0.025rem solid ${theme.palette.primary.dark}`,
  },
}));

export { useStyles };
