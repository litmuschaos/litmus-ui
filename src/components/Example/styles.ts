import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
