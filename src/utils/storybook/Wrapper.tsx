import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export { Wrapper };
