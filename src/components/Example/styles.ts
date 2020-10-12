import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: theme.palette.highlight,
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
