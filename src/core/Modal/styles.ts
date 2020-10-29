import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: () => ({
    height: '80%',
    width: '70%',
    margin: '2rem auto',
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: 3,
    textAlign: 'center',
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  closeButton: () => ({
    fontSize: '1rem',
    fontWeight: 1000,
    display: 'block',
    padding: theme.spacing(0.375, 1.5),
    minHeight: 0,
    minWidth: 0,
    borderRadius: 3,
    color: theme.palette.disabledBackground,
    border: '0.063rem solid',
    borderColor: theme.palette.border.main,
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginLeft: 'inherit',
  }),
}));

export default useStyles;
