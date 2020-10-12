import { Button } from '@material-ui/core';
import React from 'react';
import useGlobalStyles from '../styles';
import useStyles from './styles';

interface IButtonOutlinedDefault {
  isDisabled?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styles?: Object;
  children?: React.ReactNode;
}

const ButtonOutlinedDefault: React.FC<IButtonOutlinedDefault> = ({
  isDisabled,
  handleClick,
  styles,
  children,
}) => {
  // Styles
  const classes = useStyles();
  const global = useGlobalStyles();

  // Component
  if (isDisabled === undefined) isDisabled = false;

  return (
    <Button
      style={styles}
      variant="outlined"
      size="medium"
      disabled={isDisabled}
      onClick={handleClick}
      className={`${global.buttonOutline} ${classes.border}`}
    >
      {isDisabled ? (
        <div
          className={`${global.valueField} ${classes.text} ${classes.disabled}`}
        >
          {children}
        </div>
      ) : (
        <div className={`${global.valueField} ${classes.text}`}>{children}</div>
      )}
    </Button>
  );
};

export { ButtonOutlinedDefault };
