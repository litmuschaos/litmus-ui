import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  // Global
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  typography: {
    paddingLeft: theme.spacing(1),
  },
}));

export { useStyles };
