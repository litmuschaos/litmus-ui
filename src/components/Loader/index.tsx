import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  spinner: {
    color: theme.palette.secondary.dark ? "theme.palette.secondary.dark" : "theme.palette.secondary.light"
  },
}));

const Loader = () => {
  const classes = useStyles();
  return (
      <CircularProgress className={classes.spinner} />

  );
};

export default Loader;