import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    background: theme.palette.background.default,
    height: '100vh',
    width: '100%',
  },
  flex: {
    display: 'flex',
  },
  spacing: {
    margin: '1rem',
  },
}));

export default useStyles;
