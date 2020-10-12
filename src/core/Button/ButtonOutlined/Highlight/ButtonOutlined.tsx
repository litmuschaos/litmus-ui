import { Button } from '@material-ui/core';
import React from 'react';
import useGlobalStyles from '../styles';
import useStyles from './styles';

interface IButtonOutlinedHighlight {
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styles?: Object;
  children?: React.ReactNode;
}
const ButtonOutlinedHighlight: React.FC<IButtonOutlinedHighlight> = ({
  handleClick,
  styles,
  children,
}) => {
  const classes = useStyles();
  const global = useGlobalStyles();

  return (
    <Button
      style={styles}
      variant="outlined"
      size="medium"
      onClick={handleClick}
      className={`${global.buttonOutline} ${classes.border}`}
    >
      <div className={`${global.valueField} ${classes.text}`}>{children}</div>
    </Button>
  );
};

export { ButtonOutlinedHighlight };
