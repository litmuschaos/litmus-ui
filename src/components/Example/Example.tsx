import { Button } from '@material-ui/core';
import React from 'react';
import withTheme from '../../theme';
import useStyles from './styles';

const Example: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      onClick={() => console.log('hello world')}
    >
      {children}
    </Button>
  );
};

export default withTheme(Example);
