import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItems: {
    marginTop: theme.spacing(2.5),
    '& p': {
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(2.5),
      textDecoration: 'none',
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  quickActionCard: {
    fontSize: '1.125rem',
    backgroundColor: 'inherit',
    width: 'auto',
    marginLeft: theme.spacing(0.8125),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
    },
  },
}));

export default useStyles;
